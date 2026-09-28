'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  PARTNER_IMPLEMENTATIONS,
  PARTNER_REQUESTS,
  PARTNER_TECHNOLOGIES,
  getImpactStars,
  getPartnerStatusTone
} from '@/components/partner/partner-data';
import { PartnerModal } from '@/components/partner/partner-primitives';
import { PartnerShell } from '@/components/partner/partner-shell';
import { getDepartmentStyle } from '@/components/library/library-dashboard';

export function PartnerDashboard() {
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [search, setSearch] = useState('');
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<string | null>(null);

  const visibleTechnologies = useMemo(() => {
    return PARTNER_TECHNOLOGIES.filter((technology) => {
      const matchesDepartment =
        departmentFilter === 'All Departments' || technology.department === departmentFilter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        technology.title.toLowerCase().includes(term) ||
        technology.summary.toLowerCase().includes(term);

      return matchesDepartment && matchesSearch;
    }).slice(0, 3);
  }, [departmentFilter, search]);

  const selectedTechnology =
    PARTNER_TECHNOLOGIES.find((technology) => technology.id === selectedTechnologyId) || null;

  return (
    <PartnerShell
      activeNav="dashboard"
      title="Partner / Beneficiary Dashboard"
      description="Discover and adopt innovative technologies"
      notificationCount={2}
    >
      <div className="partner-dashboard-wrapper">
        {/* Minimalist Bento KPI Section */}
        <section className="partner-kpi-grid">
          {/* Card 1: Available Technologies */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Available Technologies</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-microchip" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{PARTNER_TECHNOLOGIES.length}</div>
                <p className="lib-bento-subtext">Ready for adoption</p>
              </div>
            </div>
          </article>

          {/* Card 2: My Requests */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">My Requests</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-code-pull-request" style={{ color: '#0284C7', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{PARTNER_REQUESTS.length}</div>
                <p className="lib-bento-subtext">2 approved, 2 pending</p>
              </div>
            </div>
          </article>

          {/* Card 3: Active Implementations */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Active Implementations</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-network-wired" style={{ color: '#D97706', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">{PARTNER_IMPLEMENTATIONS.length}</div>
                <p className="lib-bento-subtext">Currently deployed</p>
              </div>
            </div>
          </article>

          {/* Card 4: Success Rate */}
          <article className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Success Rate</span>
                <div className="lib-bento-icon-box">
                  <i className="fas fa-chart-line" style={{ color: '#16A34A', fontSize: '1rem' }} aria-hidden="true" />
                </div>
              </div>
              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">85%</div>
                <p className="lib-bento-subtext">Successful adoptions</p>
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
              placeholder="Search available technologies..."
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
            <select className="partner-select" defaultValue="Sort by: Latest">
              <option>Sort by: Latest</option>
              <option>Most Popular</option>
              <option>Highest Impact</option>
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

        {/* Features Grid */}
        <div className="partner-tech-grid">
          {visibleTechnologies.map((technology) => {
            const deptStyle = getDepartmentStyle(technology.department);

            return (
              <article
                key={technology.id}
                className="partner-tech-card"
                style={{
                  borderTop: `3px solid ${deptStyle.cardTopAccent || '#003A8F'}`
                }}
              >
                <div className="partner-tech-top">
                  <div
                    className="partner-tech-icon-box"
                    style={{
                      background: deptStyle.badgeBg,
                      borderColor: deptStyle.border
                    }}
                  >
                    <i aria-hidden="true" className={`fas ${technology.icon}`} style={{ color: deptStyle.accent }} />
                  </div>
                  <span
                    className="lib-dept-pill"
                    style={{
                      background: deptStyle.badgeBg,
                      color: deptStyle.text,
                      borderColor: deptStyle.border
                    }}
                  >
                    <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                    <span>{technology.department}</span>
                  </span>
                </div>

                <div>
                  <h3 className="partner-tech-title">{technology.title}</h3>
                  <p className="partner-tech-summary">{technology.summary}</p>
                </div>

                <div className="partner-readiness-box">
                  <div className="partner-readiness-head">
                    <span>Readiness: {technology.readinessLabel}</span>
                    <span style={{ color: deptStyle.accent, fontWeight: 700 }}>{technology.readinessPercent}%</span>
                  </div>
                  <div className="partner-readiness-track">
                    <div
                      className="partner-readiness-fill"
                      style={{
                        width: `${technology.readinessPercent}%`,
                        background: deptStyle.barFill
                      }}
                    />
                  </div>
                  <div className="partner-impact-row">
                    <strong style={{ color: '#334155', fontWeight: 600 }}>Impact Rating:</strong>
                    <span style={{ color: '#F59E0B', letterSpacing: '0.08em' }}>{getImpactStars(technology.impactRating)}</span>
                  </div>
                </div>

                <div className="partner-card-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedTechnologyId(technology.id)}
                    className="partner-adopt-btn"
                  >
                    <i className="fas fa-handshake" style={{ color: '#F59E0B' }} aria-hidden="true" />
                    <span>Adopt</span>
                  </button>
                  <Link
                    className="partner-details-btn"
                    href={`/partner/details?id=${technology.id}`}
                  >
                    <span>Details</span>
                    <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem', color: '#003A8F', marginLeft: '0.2rem' }} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Implementations Table */}
        <section className="partner-table-section">
          <div className="partner-table-header">
            <div>
              <h3 className="partner-table-title">My Active Implementations</h3>
              <p className="partner-table-subtitle">Monitor deployment phase, partner coordination, and feedback timing.</p>
            </div>
            <Link className="partner-tracker-link" href="/partner/implementations">
              <span>Open Full Tracker</span>
              <i className="fas fa-arrow-right" style={{ color: '#003A8F', fontSize: '0.8rem' }} aria-hidden="true" />
            </Link>
          </div>

          <div className="table-scroll" style={{ padding: '0 1rem 1rem' }}>
            <table className="lib-modern-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ minWidth: '220px' }}>Project</th>
                  <th className="lib-col-dept">Department</th>
                  <th style={{ width: '120px', minWidth: '120px' }}>Adoption Date</th>
                  <th style={{ width: '110px', minWidth: '110px' }}>Status</th>
                  <th style={{ minWidth: '160px' }}>Impact</th>
                  <th style={{ textAlign: 'right', width: '150px', minWidth: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PARTNER_IMPLEMENTATIONS.map((implementation) => {
                  const deptStyle = getDepartmentStyle(implementation.department);
                  const tone = getPartnerStatusTone(implementation.status);

                  return (
                    <tr key={implementation.id}>
                      <td style={{ color: '#0F172A', fontWeight: 600 }}>{implementation.title}</td>
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
                      <td style={{ color: '#64748B', fontSize: '0.85rem' }}>{implementation.startDate}</td>
                      <td>
                        <span className={`partner-status-pill partner-status-${tone}`}>
                          {implementation.status}
                        </span>
                      </td>
                      <td style={{ color: '#334155', fontWeight: 500, fontSize: '0.85rem' }}>{implementation.impactLabel}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'flex-end' }}>
                          <Link className="partner-action-mini-btn is-report" href="/partner/feedback">
                            <i className="fas fa-flag" style={{ color: '#EF4444', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                            Report
                          </Link>
                          <Link className="partner-action-mini-btn is-monitor" href="/partner/implementations">
                            <i className="fas fa-chart-line" style={{ color: '#003A8F', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                            Monitor
                          </Link>
                        </div>
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
        open={Boolean(selectedTechnologyId)}
        title="Request Technology Adoption"
        onClose={() => setSelectedTechnologyId(null)}
        footer={
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-outline"
              onClick={() => setSelectedTechnologyId(null)}
              style={{ padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontWeight: 600, border: '1px solid #E2E8F0', color: '#475569', background: '#FFFFFF' }}
            >
              Cancel
            </button>
            <Link
              className="btn btn-primary"
              href={`/partner/request?id=${selectedTechnology?.id}`}
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
                textDecoration: 'none'
              }}
            >
              <span>Continue Request</span>
              <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
            </Link>
          </div>
        }
      >
        <div style={{ padding: '1.25rem 0 0.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', background: 'white', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003A8F', fontSize: '1.2rem', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <i className={`fas ${selectedTechnology?.icon}`} aria-hidden="true" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#003A8F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Project</span>
              <h4 style={{ margin: '0.15rem 0 0', fontSize: '1.05rem', color: '#0F172A', fontWeight: 700 }}>{selectedTechnology?.title}</h4>
            </div>
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="partner-dashboard-plan" style={{ fontWeight: 600, color: '#334155', fontSize: '0.88rem' }}>Proposed Implementation Plan</label>
            <textarea
              defaultValue="We plan to deploy the system in a controlled pilot environment before full organizational rollout."
              id="partner-dashboard-plan"
              rows={4}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', background: '#FFFFFF', outline: 'none', resize: 'vertical', fontSize: '0.88rem', color: '#0F172A' }}
            />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="partner-dashboard-date" style={{ fontWeight: 600, color: '#334155', fontSize: '0.88rem' }}>Expected Timeline</label>
            <input
              defaultValue="2026-05-15"
              id="partner-dashboard-date"
              type="date"
              style={{ padding: '0.65rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', background: '#FFFFFF', outline: 'none', fontSize: '0.88rem', color: '#0F172A' }}
            />
          </div>
        </div>
      </PartnerModal>
    </PartnerShell>
  );
}

