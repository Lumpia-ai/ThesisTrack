'use client';

import { useMemo, useState } from 'react';
import {
  PARTNER_IMPLEMENTATIONS,
  getPartnerStatusTone
} from '@/components/partner/partner-data';
import { PartnerModal } from '@/components/partner/partner-primitives';
import { PartnerShell } from '@/components/partner/partner-shell';
import { getDepartmentStyle } from '@/components/library/library-dashboard';

export function PartnerImplementations() {
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [phaseFilter, setPhaseFilter] = useState('All Phases');
  const [selectedImplementationId, setSelectedImplementationId] = useState('');

  const implementations = useMemo(() => {
    return PARTNER_IMPLEMENTATIONS.filter((implementation) => {
      const matchesDepartment =
        departmentFilter === 'All Departments' || implementation.department === departmentFilter;
      const matchesPhase = phaseFilter === 'All Phases' || implementation.currentPhase === phaseFilter;

      return matchesDepartment && matchesPhase;
    });
  }, [departmentFilter, phaseFilter]);

  const selectedImplementation =
    PARTNER_IMPLEMENTATIONS.find((implementation) => implementation.id === selectedImplementationId) ??
    PARTNER_IMPLEMENTATIONS[0];

  const testingCount = PARTNER_IMPLEMENTATIONS.filter(i => i.currentPhase === 'Testing Phase').length;
  const operationalCount = PARTNER_IMPLEMENTATIONS.filter(i => i.currentPhase === 'Fully Operational').length;

  return (
    <PartnerShell
      activeNav="implementations"
      title="Active Implementations"
      description="Monitor and manage your ongoing technology implementations"
      notificationCount={2}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '2.5rem' }}>
        
        {/* Minimalist Bento KPI Section */}
        <section className="partner-kpi-grid">
          {/* Card 1: Active Implementations */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Active Implementations</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-rocket" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{PARTNER_IMPLEMENTATIONS.length}</div>
                <p className="lib-bento-subtext">Deployed & tracked solutions</p>
              </div>
            </div>
          </article>

          {/* Card 2: In Testing Phase */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">In Testing Phase</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-flask" style={{ color: '#F59E0B', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{testingCount}</div>
                <p className="lib-bento-subtext">Under validation & feedback</p>
              </div>
            </div>
          </article>

          {/* Card 3: Fully Operational */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Fully Operational</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-check-circle" style={{ color: '#16A34A', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{operationalCount}</div>
                <p className="lib-bento-subtext">Complete organizational adoption</p>
              </div>
            </div>
          </article>

          {/* Card 4: Success Rate */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Success Rate</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-chart-line" style={{ color: '#8B5CF6', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">94%</div>
                <p className="lib-bento-subtext">Positive transfer outcomes</p>
              </div>
            </div>
          </article>
        </section>

        {/* Filter Bar */}
        <div className="partner-filter-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#003A8F', fontWeight: 700, fontSize: '0.85rem', padding: '0 0.5rem' }}>
            <i className="fas fa-filter" style={{ color: '#003A8F' }} aria-hidden="true" />
            <span>Filters</span>
          </div>
          <div className="partner-select-wrap" style={{ flex: 1, minWidth: '200px' }}>
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
          <div className="partner-select-wrap" style={{ flex: 1, minWidth: '200px' }}>
            <select
              className="partner-select"
              value={phaseFilter}
              onChange={(event) => setPhaseFilter(event.target.value)}
            >
              <option>All Phases</option>
              <option>Planning</option>
              <option>Setup</option>
              <option>Testing Phase</option>
              <option>Training</option>
              <option>Go-Live</option>
              <option>Fully Operational</option>
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

        {/* Implementation Cards */}
        <div className="partner-impl-grid">
          {implementations.map((implementation) => {
            const deptStyle = getDepartmentStyle(implementation.department);

            return (
              <article
                key={implementation.id}
                className="partner-impl-card"
                style={{
                  borderTop: `3px solid ${deptStyle.cardTopAccent || '#003A8F'}`
                }}
              >
                <div className="partner-impl-head">
                  <h3 className="partner-impl-title">{implementation.title}</h3>
                  <span
                    className="lib-dept-pill"
                    style={{
                      background: deptStyle.badgeBg,
                      color: deptStyle.text,
                      borderColor: deptStyle.border
                    }}
                  >
                    <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                    <span>{implementation.department}</span>
                  </span>
                </div>

                <div className="partner-readiness-box" style={{ margin: 0 }}>
                  <div className="partner-readiness-head">
                    <span style={{ color: '#475569' }}>{implementation.currentPhase}</span>
                    <span style={{ color: deptStyle.accent, fontWeight: 700 }}>{implementation.progress}%</span>
                  </div>
                  <div className="partner-readiness-track">
                    <div
                      className="partner-readiness-fill"
                      style={{
                        width: `${implementation.progress}%`,
                        background: deptStyle.barFill
                      }}
                    />
                  </div>
                </div>

                <div className="partner-impl-meta-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontSize: '0.75rem' }}>Start Date</span>
                    <span style={{ color: '#334155', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <i className="far fa-calendar-alt" style={{ color: '#64748B' }} aria-hidden="true" />
                      {implementation.startDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontSize: '0.75rem' }}>Target Go-Live</span>
                    <span style={{ color: '#334155', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <i className="far fa-flag" style={{ color: '#64748B' }} aria-hidden="true" />
                      {implementation.targetDate}
                    </span>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <span
                      style={{
                        background: '#DCFCE7',
                        color: '#15803D',
                        border: '1px solid #BBF7D0',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <i className="fas fa-chart-pie" style={{ color: '#16A34A' }} aria-hidden="true" />
                      <span>{implementation.impactLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Milestones timeline */}
                <div className="partner-impl-milestones">
                  {implementation.milestones.map((milestone) => {
                    const isCompleted = milestone.state === 'completed';
                    const isActive = milestone.state === 'current';

                    return (
                      <div key={milestone.label} className="partner-impl-milestone-step">
                        <div
                          className="partner-impl-milestone-bar"
                          style={{
                            background: isCompleted ? '#16A34A' : isActive ? '#003A8F' : '#E2E8F0'
                          }}
                        >
                          {(isCompleted || isActive) && (
                            <div
                              className="partner-impl-milestone-dot"
                              style={{
                                background: isCompleted ? '#16A34A' : '#003A8F',
                                boxShadow: `0 0 0 1px ${isCompleted ? '#16A34A' : '#003A8F'}`
                              }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: isCompleted ? '#16A34A' : isActive ? '#003A8F' : '#94A3B8',
                            textTransform: 'uppercase'
                          }}
                        >
                          {milestone.label.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="partner-impl-footer">
                  <button
                    type="button"
                    onClick={() => setSelectedImplementationId(implementation.id)}
                    className="partner-details-btn"
                  >
                    <i className="fas fa-file-lines" style={{ color: '#003A8F', marginRight: '0.35rem' }} aria-hidden="true" />
                    <span>View Notes</span>
                  </button>
                  <button
                    type="button"
                    className="partner-adopt-btn"
                  >
                    <i className="fas fa-flag" style={{ color: '#F59E0B', marginRight: '0.35rem' }} aria-hidden="true" />
                    <span>Submit Report</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Portfolio Table */}
        <section className="partner-table-section">
          <div className="partner-table-header">
            <div>
              <h3 className="partner-table-title">Implementation Portfolio</h3>
              <p className="partner-table-subtitle">Summary of all registered deployments across academic departments.</p>
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
              <i className="fas fa-layer-group" style={{ color: '#003A8F' }} aria-hidden="true" />
              <span>{implementations.length} Active Records</span>
            </div>
          </div>

          <div className="table-scroll" style={{ padding: '0 1rem 1rem' }}>
            <table className="lib-modern-table" style={{ width: '100%', minWidth: '850px' }}>
              <thead>
                <tr>
                  <th style={{ minWidth: '240px' }}>Project</th>
                  <th className="lib-col-dept">Department</th>
                  <th style={{ minWidth: '160px' }}>Partner</th>
                  <th style={{ width: '150px', minWidth: '150px' }}>Phase</th>
                  <th style={{ width: '160px', minWidth: '160px' }}>Progress</th>
                  <th style={{ width: '120px', minWidth: '120px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {implementations.map((implementation) => {
                  const deptStyle = getDepartmentStyle(implementation.department);
                  const tone = getPartnerStatusTone(implementation.status);

                  return (
                    <tr key={implementation.id}>
                      <td style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.92rem' }}>
                        {implementation.title}
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
                          <span>{implementation.department}</span>
                        </span>
                      </td>
                      <td style={{ color: '#475569', fontWeight: 600, fontSize: '0.88rem' }}>
                        {implementation.partner}
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.88rem' }}>
                        {implementation.currentPhase}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontWeight: 700, color: '#003A8F', fontSize: '0.85rem', width: '38px' }}>
                            {implementation.progress}%
                          </span>
                          <div style={{ width: '70px', height: '6px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${implementation.progress}%`,
                                height: '100%',
                                background: deptStyle.barFill,
                                borderRadius: '999px'
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`partner-status-pill partner-status-${tone}`}>
                          {implementation.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <PartnerModal
        open={Boolean(selectedImplementationId)}
        title={selectedImplementation.title}
        onClose={() => setSelectedImplementationId('')}
        footer={
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedImplementationId('')}
              style={{
                background: '#003A8F',
                border: '1px solid #003A8F',
                color: 'white',
                padding: '0.55rem 1.3rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.75rem 0 0.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#F8FAFC', padding: '1.2rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.25rem' }}>Partner</span>
              <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{selectedImplementation.partner}</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.25rem' }}>Target Date</span>
              <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{selectedImplementation.targetDate}</strong>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.35rem' }}>Current Phase</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', background: '#EFF6FF', color: '#003A8F', border: '1px solid #BFDBFE', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.82rem' }}>
                {selectedImplementation.currentPhase}
              </div>
            </div>
          </div>
          
          <div style={{ background: '#FEF9C3', padding: '1rem 1.25rem', borderRadius: '0.6rem', border: '1px solid #FDE68A', borderLeft: '4px solid #F59E0B' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.35rem' }}>
              <i className="fas fa-info-circle" style={{ color: '#B45309' }} aria-hidden="true" />
              Status Note
            </span>
            <p style={{ margin: 0, color: '#92400E', fontSize: '0.9rem', lineHeight: 1.5 }}>Maintain weekly coordination and deployment documentation.</p>
          </div>
        </div>
      </PartnerModal>
    </PartnerShell>
  );
}

