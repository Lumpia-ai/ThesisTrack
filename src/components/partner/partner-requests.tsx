'use client';

import { useMemo, useState } from 'react';
import {
  PARTNER_REQUESTS,
  getPartnerRequest,
  getPartnerStatusTone
} from '@/components/partner/partner-data';
import { PartnerModal } from '@/components/partner/partner-primitives';
import { PartnerShell } from '@/components/partner/partner-shell';
import { getDepartmentStyle } from '@/components/library/library-dashboard';

export function PartnerRequests() {
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [search, setSearch] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');

  const filteredRequests = useMemo(() => {
    return PARTNER_REQUESTS.filter((request) => {
      const matchesDepartment =
        departmentFilter === 'All Departments' || request.department === departmentFilter;
      const matchesStatus = statusFilter === 'All Statuses' || request.status === statusFilter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term || request.projectTitle.toLowerCase().includes(term) || request.id.toLowerCase().includes(term);

      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [departmentFilter, search, statusFilter]);

  const selectedRequest = getPartnerRequest(selectedRequestId || null);

  const pendingCount = PARTNER_REQUESTS.filter(i => i.status === 'Pending').length;
  const approvedCount = PARTNER_REQUESTS.filter(i => i.status === 'Approved').length;
  const negotiationCount = PARTNER_REQUESTS.filter(i => i.status === 'Negotiation').length;

  return (
    <PartnerShell
      activeNav="requests"
      title="My Adoption Requests"
      description="Track and manage your technology adoption requests"
      notificationCount={1}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '2.5rem' }}>
        
        {/* Minimalist Bento KPI Section */}
        <section className="partner-kpi-grid">
          {/* Card 1: Total Requests */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Total Requests</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-folder-open" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{PARTNER_REQUESTS.length}</div>
                <p className="lib-bento-subtext">Submitted applications</p>
              </div>
            </div>
          </article>

          {/* Card 2: Pending Review */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Pending Review</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-clock" style={{ color: '#F59E0B', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{pendingCount}</div>
                <p className="lib-bento-subtext">Awaiting administrative check</p>
              </div>
            </div>
          </article>

          {/* Card 3: Approved */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Approved</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-check-circle" style={{ color: '#16A34A', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{approvedCount}</div>
                <p className="lib-bento-subtext">Ready for MOA execution</p>
              </div>
            </div>
          </article>

          {/* Card 4: In Negotiation */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">In Negotiation</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-handshake" style={{ color: '#8B5CF6', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{negotiationCount}</div>
                <p className="lib-bento-subtext">Terms & timeline alignment</p>
              </div>
            </div>
          </article>
        </section>

        {/* Filter Bar */}
        <div className="partner-filter-bar">
          <div className="partner-search-wrap">
            <i className="fas fa-search" style={{ color: '#003A8F', fontSize: '0.85rem' }} aria-hidden="true" />
            <input
              className="partner-search-input"
              placeholder="Search by project title or ID..."
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="partner-select-wrap">
            <select
              className="partner-select"
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
            >
              <option>All Departments</option>
              <option>IT</option>
              <option>MET</option>
              <option>TCM</option>
              <option>ESM</option>
              <option>NAME</option>
            </select>
            <i
              className="fas fa-chevron-down"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.75rem',
                color: '#64748B',
                pointerEvents: 'none'
              }}
              aria-hidden="true"
            />
          </div>
          <div className="partner-select-wrap">
            <select
              className="partner-select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Negotiation</option>
              <option>Completed</option>
            </select>
            <i
              className="fas fa-chevron-down"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.75rem',
                color: '#64748B',
                pointerEvents: 'none'
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Requests Table */}
        <section className="partner-table-section">
          <div className="partner-table-header">
            <div>
              <h3 className="partner-table-title">Active Requests</h3>
              <p className="partner-table-subtitle">Track submission status, review feedback, and legal agreements.</p>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
              }}
            >
              <i className="fas fa-list-check" style={{ color: '#003A8F' }} aria-hidden="true" />
              <span>{filteredRequests.length} of {PARTNER_REQUESTS.length} Requests</span>
            </div>
          </div>

          <div className="table-scroll" style={{ padding: '0 1rem 1rem' }}>
            <table className="lib-modern-table" style={{ width: '100%', minWidth: '850px' }}>
              <thead>
                <tr>
                  <th style={{ width: '130px', minWidth: '130px' }}>Request ID</th>
                  <th style={{ minWidth: '260px' }}>Project Title</th>
                  <th className="lib-col-dept">Department</th>
                  <th style={{ width: '130px', minWidth: '130px' }}>Request Date</th>
                  <th style={{ width: '120px', minWidth: '120px' }}>Status</th>
                  <th style={{ textAlign: 'right', width: '220px', minWidth: '220px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => {
                  const deptStyle = getDepartmentStyle(request.department);
                  const tone = getPartnerStatusTone(request.status);

                  return (
                    <tr key={request.id}>
                      <td style={{ color: '#64748B', fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600 }}>
                        {request.id}
                      </td>
                      <td style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.92rem' }}>
                        {request.projectTitle}
                      </td>
                      <td className="lib-col-dept">
                        <span
                          className="lib-dept-pill"
                          style={{
                            background: deptStyle.badgeBg,
                            color: deptStyle.text,
                            borderColor: deptStyle.border
                          }}
                        >
                          <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                          <span>{request.department}</span>
                        </span>
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.85rem' }}>{request.requestDate}</td>
                      <td>
                        <span className={`partner-status-pill partner-status-${tone}`}>
                          {request.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedRequestId(request.id)}
                            className="partner-action-mini-btn is-report"
                          >
                            <i className="fas fa-eye" style={{ color: '#003A8F', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                            View
                          </button>
                          {request.status === 'Approved' ? (
                            <button
                              type="button"
                              className="partner-action-mini-btn is-monitor"
                            >
                              <i className="fas fa-file-signature" style={{ color: '#003A8F', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                              Proceed to MOA
                            </button>
                          ) : request.status === 'Pending' ? (
                            <button
                              type="button"
                              style={{
                                padding: '0.35rem 0.75rem',
                                borderRadius: '0.45rem',
                                border: '1px solid #FECACA',
                                background: '#FEF2F2',
                                color: '#DC2626',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              <i className="fas fa-times" style={{ color: '#DC2626', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                              Cancel
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="partner-action-mini-btn is-report"
                            >
                              <i className="fas fa-arrow-right" style={{ color: '#475569', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                              Continue
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Dynamic Pagination */}
        <nav className="lib-pagination" aria-label="Requests Pagination">
          <button
            type="button"
            className="lib-page-num-btn is-active"
            aria-current="page"
          >
            1
          </button>
          <button
            type="button"
            className="lib-page-num-btn"
          >
            2
          </button>
          <button
            type="button"
            className="lib-page-nav-btn"
            aria-label="Next Page"
          >
            <span>Next</span>
            <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', color: '#003A8F' }} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <PartnerModal
        open={Boolean(selectedRequestId)}
        title={`Request Details - ${selectedRequest.id}`}
        onClose={() => setSelectedRequestId('')}
        footer={
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-outline"
              onClick={() => setSelectedRequestId('')}
              style={{ padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontWeight: 600, border: '1px solid #E2E8F0', color: '#475569', background: '#FFFFFF' }}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedRequestId('')}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '0.5rem',
                background: '#003A8F',
                border: '1px solid #003A8F',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <span>Download MOA Draft</span>
              <i className="fas fa-file-download" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.75rem 0 0.5rem' }}>
          <div style={{ background: '#F8FAFC', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '1.05rem', color: '#0F172A', fontWeight: 700 }}>{selectedRequest.projectTitle}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              {(() => {
                const deptStyle = getDepartmentStyle(selectedRequest.department);
                const tone = getPartnerStatusTone(selectedRequest.status);
                return (
                  <>
                    <span
                      className="lib-dept-pill"
                      style={{
                        background: deptStyle.badgeBg,
                        color: deptStyle.text,
                        borderColor: deptStyle.border
                      }}
                    >
                      <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                      <span>{selectedRequest.department}</span>
                    </span>
                    <span className={`partner-status-pill partner-status-${tone}`}>
                      {selectedRequest.status}
                    </span>
                  </>
                );
              })()}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #F1F5F9' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.25rem' }}>Request Date</span>
              <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{selectedRequest.requestDate}</strong>
            </div>
            <div style={{ background: '#FFFFFF', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #F1F5F9' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.25rem' }}>Budget Range</span>
              <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{selectedRequest.budgetRange}</strong>
            </div>
            <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #F1F5F9' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.25rem' }}>Timeline</span>
              <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{selectedRequest.timeline}</strong>
            </div>
            <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #F1F5F9' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.35rem' }}>Implementation Plan</span>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>{selectedRequest.implementationPlan}</p>
            </div>
            {selectedRequest.comments ? (
              <div style={{ gridColumn: '1 / -1', background: '#FEF9C3', padding: '1rem', borderRadius: '0.6rem', border: '1px solid #FDE68A', borderLeft: '4px solid #F59E0B' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <i className="fas fa-comment-dots" style={{ color: '#B45309' }} aria-hidden="true" />
                  TTO Comments
                </span>
                <p style={{ margin: 0, color: '#92400E', fontSize: '0.88rem', lineHeight: 1.5 }}>{selectedRequest.comments}</p>
              </div>
            ) : null}
          </div>
        </div>
      </PartnerModal>
    </PartnerShell>
  );
}

