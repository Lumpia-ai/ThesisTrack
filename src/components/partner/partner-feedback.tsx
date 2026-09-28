'use client';

import { useMemo, useState } from 'react';
import {
  PARTNER_FEEDBACK,
  PARTNER_IMPLEMENTATIONS,
  getPartnerStatusTone
} from '@/components/partner/partner-data';
import { getDepartmentStyle } from '@/components/library/library-dashboard';
import {
  PartnerModal,
  PartnerStatusBadge
} from '@/components/partner/partner-primitives';
import { PartnerShell } from '@/components/partner/partner-shell';

export function PartnerFeedback() {
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState('');
  const [submitOpen, setSubmitOpen] = useState(false);

  const feedbackEntries = useMemo(() => {
    return PARTNER_FEEDBACK.filter((entry) => {
      return categoryFilter === 'All Categories' || entry.category === categoryFilter;
    });
  }, [categoryFilter]);

  const selectedFeedback =
    PARTNER_FEEDBACK.find((entry) => entry.id === selectedFeedbackId) ?? PARTNER_FEEDBACK[0];

  const needsFollowUpCount = useMemo(() => {
    return PARTNER_FEEDBACK.filter((i) => i.status === 'Needs Follow-up').length;
  }, []);

  const resolvedCount = useMemo(() => {
    return PARTNER_FEEDBACK.filter((i) => i.status === 'Resolved').length;
  }, []);

  return (
    <PartnerShell
      activeNav="feedback"
      title="Feedback & Reports"
      description="Share partner observations, issue logs, and rollout updates"
      notificationCount={2}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Minimalist Bento KPI Section */}
        <div className="lib-bento-grid">
          <article className="lib-bento-card">
            <div className="lib-bento-card-content">
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Total Reports</span>
                <div className="lib-bento-icon-box" style={{ background: '#EFF6FF', color: '#003A8F' }}>
                  <i className="fas fa-file-lines" aria-hidden="true" />
                </div>
              </div>
              <div className="lib-bento-metric">{PARTNER_FEEDBACK.length}</div>
              <p className="lib-bento-subtext">Partner documentation filed</p>
            </div>
          </article>

          <article className="lib-bento-card">
            <div className="lib-bento-card-content">
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Needs Follow-up</span>
                <div className="lib-bento-icon-box" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
                  <i className="fas fa-circle-exclamation" aria-hidden="true" />
                </div>
              </div>
              <div className="lib-bento-metric">{needsFollowUpCount}</div>
              <p className="lib-bento-subtext">Requires team coordination</p>
            </div>
          </article>

          <article className="lib-bento-card">
            <div className="lib-bento-card-content">
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Resolved Items</span>
                <div className="lib-bento-icon-box" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                  <i className="fas fa-circle-check" aria-hidden="true" />
                </div>
              </div>
              <div className="lib-bento-metric">{resolvedCount}</div>
              <p className="lib-bento-subtext">Successfully addressed</p>
            </div>
          </article>

          <article className="lib-bento-card">
            <div className="lib-bento-card-content">
              <div className="lib-bento-head">
                <span className="lib-bento-kicker">Deployments</span>
                <div className="lib-bento-icon-box" style={{ background: '#CCFBF1', color: '#0D9488' }}>
                  <i className="fas fa-rocket" aria-hidden="true" />
                </div>
              </div>
              <div className="lib-bento-metric">{PARTNER_IMPLEMENTATIONS.length}</div>
              <p className="lib-bento-subtext">Active project rollouts</p>
            </div>
          </article>
        </div>

        {/* Filter and Actions Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#FFFFFF',
            padding: '0.85rem 1.25rem',
            borderRadius: '0.85rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <i className="fas fa-filter" style={{ color: '#003A8F', fontSize: '0.82rem' }} aria-hidden="true" />
              <span>Category:</span>
            </span>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                aria-label="Filter by report category"
                style={{
                  appearance: 'none',
                  padding: '0.5rem 2.2rem 0.5rem 0.95rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #CBD5E1',
                  background: '#F8FAFC',
                  color: '#1E293B',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option>All Categories</option>
                <option>Progress Report</option>
                <option>Issue Log</option>
                <option>Impact Feedback</option>
              </select>
              <i
                className="fas fa-chevron-down"
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#64748B',
                  fontSize: '0.72rem'
                }}
                aria-hidden="true"
              />
            </div>
            <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, marginLeft: '0.25rem' }}>
              Showing {feedbackEntries.length} of {PARTNER_FEEDBACK.length} reports
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSubmitOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '0.5rem',
              border: '1px solid #003A8F',
              background: '#003A8F',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0, 58, 143, 0.15)',
              transition: 'all 0.15s ease'
            }}
          >
            <i className="fas fa-plus" aria-hidden="true" />
            <span>New Feedback Report</span>
          </button>
        </div>

        {/* Feedback Grid */}
        <div className="partner-feedback-grid">
          {feedbackEntries.map((entry) => {
            const relatedImplementation = PARTNER_IMPLEMENTATIONS.find(
              (impl) => impl.id === entry.implementationId
            );
            const deptStyle = relatedImplementation ? getDepartmentStyle(relatedImplementation.department) : null;
            const tone = getPartnerStatusTone(entry.status);

            const categoryConfig = {
              'Progress Report': { icon: 'fa-chart-line', color: '#003A8F', bg: '#EFF6FF', border: '#BFDBFE' },
              'Issue Log': { icon: 'fa-triangle-exclamation', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
              'Impact Feedback': { icon: 'fa-star', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' }
            }[entry.category] ?? { icon: 'fa-file-lines', color: '#475569', bg: '#F1F5F9', border: '#E2E8F0' };

            return (
              <article
                key={entry.id}
                className="partner-feedback-card"
                style={{
                  borderTop: `3px solid ${deptStyle ? deptStyle.cardTopAccent : '#003A8F'}`
                }}
              >
                <div className="partner-feedback-head">
                  <div className="partner-feedback-toprow">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          background: categoryConfig.bg,
                          color: categoryConfig.color,
                          border: `1px solid ${categoryConfig.border}`,
                          padding: '0.22rem 0.65rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}
                      >
                        <i className={`fas ${categoryConfig.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                        <span>{entry.category}</span>
                      </span>

                      {relatedImplementation && deptStyle && (
                        <span
                          className="lib-dept-pill"
                          style={{
                            background: deptStyle.badgeBg,
                            color: deptStyle.text,
                            borderColor: deptStyle.border
                          }}
                        >
                          <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                          <span>{relatedImplementation.department}</span>
                        </span>
                      )}
                    </div>

                    <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <i className="far fa-calendar-alt" style={{ color: '#94A3B8' }} aria-hidden="true" />
                      {entry.submittedAt}
                    </span>
                  </div>

                  <h3 className="partner-feedback-title">{entry.title}</h3>

                  {relatedImplementation && (
                    <div className="partner-feedback-project">
                      <i className="fas fa-layer-group" style={{ color: deptStyle?.accent || '#003A8F' }} aria-hidden="true" />
                      <span>{relatedImplementation.title}</span>
                    </div>
                  )}
                </div>

                <div className="partner-feedback-summary-box">
                  {entry.summary}
                </div>

                <div className="partner-feedback-footer">
                  <PartnerStatusBadge tone={tone}>{entry.status}</PartnerStatusBadge>

                  <button
                    type="button"
                    onClick={() => setSelectedFeedbackId(entry.id)}
                    className="partner-feedback-open-btn"
                  >
                    <i className="fas fa-file-lines" style={{ color: '#003A8F' }} aria-hidden="true" />
                    <span>Open Entry</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty state if filtered results are 0 */}
        {feedbackEntries.length === 0 && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '1rem',
              border: '1px solid #E2E8F0',
              padding: '3rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#F1F5F9',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}
            >
              <i className="fas fa-folder-open" aria-hidden="true" />
            </div>
            <h4 style={{ margin: 0, color: '#0F172A', fontWeight: 700, fontSize: '1rem' }}>No feedback reports found</h4>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>
              No reports match the selected category &quot;{categoryFilter}&quot;.
            </p>
            <button
              type="button"
              onClick={() => setCategoryFilter('All Categories')}
              style={{
                marginTop: '0.5rem',
                padding: '0.45rem 1rem',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '0.5rem',
                color: '#003A8F',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Info Note */}
        <section className="partner-feedback-info-card">
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#EFF6FF',
              color: '#003A8F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              flexShrink: 0
            }}
          >
            <i className="fas fa-info-circle" aria-hidden="true" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
              Partner Reporting Notes
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Use this area for implementation blockers, user feedback, and operational impact documentation.
            </p>
            <div
              style={{
                background: '#F8FAFC',
                padding: '0.85rem 1rem',
                borderRadius: '0.65rem',
                border: '1px solid #E2E8F0',
                color: '#475569',
                fontSize: '0.84rem',
                lineHeight: 1.5,
                marginTop: '0.25rem'
              }}
            >
              Reporting records support TTO validation, refinement requests, and implementation closeout. Keep summaries concise and attach evidence during scheduled reviews.
            </div>
          </div>
        </section>

      </div>

      {/* Details Modal */}
      <PartnerModal
        open={Boolean(selectedFeedbackId)}
        title={selectedFeedback.title}
        onClose={() => setSelectedFeedbackId('')}
        footer={
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setSelectedFeedbackId('')}
              style={{
                background: '#003A8F',
                color: '#FFFFFF',
                border: '1px solid #003A8F',
                padding: '0.55rem 1.3rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        }
      >
        {(() => {
          const related = PARTNER_IMPLEMENTATIONS.find((impl) => impl.id === selectedFeedback.implementationId);
          const dept = related ? getDepartmentStyle(related.department) : null;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#EFF6FF',
                    color: '#003A8F',
                    border: '1px solid #BFDBFE',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}
                >
                  {selectedFeedback.category}
                </span>

                {related && dept && (
                  <span
                    className="lib-dept-pill"
                    style={{
                      background: dept.badgeBg,
                      color: dept.text,
                      borderColor: dept.border
                    }}
                  >
                    <i className={`fas ${dept.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                    <span>{related.department}</span>
                  </span>
                )}

                <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <i className="far fa-calendar-alt" style={{ color: '#94A3B8' }} aria-hidden="true" />
                  {selectedFeedback.submittedAt}
                </span>

                <PartnerStatusBadge tone={getPartnerStatusTone(selectedFeedback.status)}>
                  {selectedFeedback.status}
                </PartnerStatusBadge>
              </div>

              {related && (
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '0.65rem', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                    Associated Implementation
                  </span>
                  <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{related.title}</strong>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <span>Partner: <strong>{related.partner}</strong></span>
                    <span>Phase: <strong>{related.currentPhase}</strong></span>
                  </div>
                </div>
              )}

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.6rem' }}>
                  Summary Details
                </span>
                <p style={{ margin: 0, color: '#0F172A', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {selectedFeedback.summary}
                </p>
              </div>
            </div>
          );
        })()}
      </PartnerModal>

      {/* New Feedback Report Modal */}
      <PartnerModal
        open={submitOpen}
        title="New Feedback Report"
        onClose={() => setSubmitOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setSubmitOpen(false)}
              style={{
                background: '#FFFFFF',
                color: '#475569',
                border: '1px solid #E2E8F0',
                padding: '0.55rem 1.15rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setSubmitOpen(false)}
              style={{
                background: '#003A8F',
                color: '#FFFFFF',
                border: '1px solid #003A8F',
                padding: '0.55rem 1.3rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-paper-plane" aria-hidden="true" />
              <span>Submit Report</span>
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="partner-feedback-implementation" style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem' }}>
              Implementation Project
            </label>
            <div style={{ position: 'relative' }}>
              <select
                id="partner-feedback-implementation"
                style={{
                  width: '100%',
                  appearance: 'none',
                  padding: '0.65rem 2.2rem 0.65rem 0.95rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #CBD5E1',
                  background: '#F8FAFC',
                  outline: 'none',
                  color: '#0F172A',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                {PARTNER_IMPLEMENTATIONS.map((implementation) => (
                  <option key={implementation.id} value={implementation.id}>
                    [{implementation.department}] {implementation.title}
                  </option>
                ))}
              </select>
              <i
                className="fas fa-chevron-down"
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#64748B',
                  fontSize: '0.75rem'
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="partner-feedback-category" style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem' }}>
              Report Category
            </label>
            <div style={{ position: 'relative' }}>
              <select
                defaultValue="Progress Report"
                id="partner-feedback-category"
                style={{
                  width: '100%',
                  appearance: 'none',
                  padding: '0.65rem 2.2rem 0.65rem 0.95rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #CBD5E1',
                  background: '#F8FAFC',
                  outline: 'none',
                  color: '#0F172A',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                <option>Progress Report</option>
                <option>Issue Log</option>
                <option>Impact Feedback</option>
              </select>
              <i
                className="fas fa-chevron-down"
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#64748B',
                  fontSize: '0.75rem'
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="partner-feedback-summary" style={{ fontWeight: 700, color: '#334155', fontSize: '0.88rem' }}>
              Detailed Summary
            </label>
            <textarea
              id="partner-feedback-summary"
              rows={5}
              placeholder="Describe the progress, issue, or feedback in detail..."
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '0.5rem',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                outline: 'none',
                color: '#0F172A',
                resize: 'vertical',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </PartnerModal>
    </PartnerShell>
  );
}

