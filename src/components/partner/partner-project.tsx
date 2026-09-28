'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PARTNER_TECHNOLOGIES, getImpactStars, type PartnerDepartment } from '@/components/partner/partner-data';
import { PartnerModal } from '@/components/partner/partner-primitives';
import { PartnerShell } from '@/components/partner/partner-shell';
import { getDepartmentStyle } from '@/components/library/library-dashboard';

const ITEMS_PER_PAGE = 6;

export function PartnerProject() {
  const [departmentFilter, setDepartmentFilter] = useState<'all' | PartnerDepartment>('all');
  const [sortBy, setSortBy] = useState('Sort by: Latest');
  const [search, setSearch] = useState('');
  const [selectedTechnologyId, setSelectedTechnologyId] = useState('');
  const [viewMode, setViewMode] = useState<'scholar' | 'cards' | 'table'>('cards');
  const [currentPage, setCurrentPage] = useState(1);

  const technologies = useMemo(() => {
    const filtered = PARTNER_TECHNOLOGIES.filter((technology) => {
      const matchesDepartment =
        departmentFilter === 'all' || technology.department === departmentFilter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        technology.title.toLowerCase().includes(term) ||
        technology.summary.toLowerCase().includes(term) ||
        technology.abstract.toLowerCase().includes(term) ||
        technology.industries.join(' ').toLowerCase().includes(term);

      return matchesDepartment && matchesSearch;
    });

    if (sortBy === 'Highest Impact') {
      return [...filtered].sort((left, right) => right.impactRating - left.impactRating);
    }

    if (sortBy === 'Technology Readiness') {
      return [...filtered].sort((left, right) => right.readinessPercent - left.readinessPercent);
    }

    return filtered;
  }, [departmentFilter, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(technologies.length / ITEMS_PER_PAGE));
  const paginatedTechnologies = technologies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const selectedTechnology = PARTNER_TECHNOLOGIES.find((technology) => technology.id === selectedTechnologyId);

  return (
    <PartnerShell
      activeNav="project"
      title="Technology Repository"
      description="Discover, analyze, and request innovative solutions ready for industry adoption"
      notificationCount={2}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '2.5rem' }}>
        
        {/* Minimalist Page Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>Available Technologies</h2>
            <p style={{ margin: '0.2rem 0 0 0', color: '#64748B', fontSize: '0.88rem' }}>
              Discover, analyze, and request innovative solutions ready for industry adoption
            </p>
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
            <span>Showing {technologies.length} of {PARTNER_TECHNOLOGIES.length} Technologies</span>
          </div>
        </div>

        {/* Modern Filter Bar */}
        <section className="lib-filter-card" aria-label="Technology Repository Filters">
          <div className="lib-filter-row">
            
            {/* Search Input */}
            <div className="lib-filter-field" style={{ flex: '2 1 280px' }}>
              <label htmlFor="partner-project-search" className="lib-filter-label">Search Repository</label>
              <div className="lib-search-input-wrap">
                <i className="fas fa-search lib-search-input-icon" style={{ color: '#003A8F' }} aria-hidden="true" />
                <input
                  id="partner-project-search"
                  placeholder="Search by keyword, technology, or application..."
                  type="text"
                  className="lib-search-input"
                  value={search}
                  onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="lib-filter-field" style={{ flex: '1 1 150px' }}>
              <label htmlFor="partner-project-dept" className="lib-filter-label">Department</label>
              <div className="lib-select-wrap">
                <select
                  id="partner-project-dept"
                  className="lib-filter-select"
                  value={departmentFilter}
                  onChange={(event) => { setDepartmentFilter(event.target.value as 'all' | PartnerDepartment); setCurrentPage(1); }}
                >
                  <option value="all">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="MET">MET</option>
                  <option value="TCM">TCM</option>
                  <option value="ESM">ESM</option>
                  <option value="NAME">NAME</option>
                </select>
                <i className="fas fa-chevron-down lib-select-chevron" aria-hidden="true" />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="lib-filter-field" style={{ flex: '1 1 170px' }}>
              <label htmlFor="partner-project-sort" className="lib-filter-label">Sort Options</label>
              <div className="lib-select-wrap">
                <select
                  id="partner-project-sort"
                  className="lib-filter-select"
                  value={sortBy}
                  onChange={(event) => { setSortBy(event.target.value); setCurrentPage(1); }}
                >
                  <option>Sort by: Latest</option>
                  <option>Most Popular</option>
                  <option>Highest Impact</option>
                  <option>Technology Readiness</option>
                </select>
                <i className="fas fa-chevron-down lib-select-chevron" aria-hidden="true" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="lib-filter-field">
              <span className="lib-filter-label">View</span>
              <div className="lib-view-toggle">
                <button
                  type="button"
                  onClick={() => setViewMode('scholar')}
                  className={`lib-view-toggle-btn${viewMode === 'scholar' ? ' is-active' : ''}`}
                  title="Scholar View"
                >
                  <i className="fas fa-grip-lines" style={{ color: viewMode === 'scholar' ? '#003A8F' : '#64748B' }} aria-hidden="true" />
                  <span>Scholar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`lib-view-toggle-btn${viewMode === 'cards' ? ' is-active' : ''}`}
                  title="Cards View"
                >
                  <i className="fas fa-table-cells-large" style={{ color: viewMode === 'cards' ? '#003A8F' : '#64748B' }} aria-hidden="true" />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`lib-view-toggle-btn${viewMode === 'table' ? ' is-active' : ''}`}
                  title="Table View"
                >
                  <i className="fas fa-table-list" style={{ color: viewMode === 'table' ? '#003A8F' : '#64748B' }} aria-hidden="true" />
                  <span>Table</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Results Container */}
        {technologies.length === 0 ? (
          <div className="lib-empty-state">
            <div className="lib-empty-state-icon">
              <i className="fas fa-search" style={{ color: '#003A8F' }} aria-hidden="true" />
            </div>
            <div>
              <h3 className="lib-empty-state-title">No technologies found</h3>
              <p className="lib-empty-state-text">Try adjusting your filters or search terms.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDepartmentFilter('all');
                setSortBy('Sort by: Latest');
                setCurrentPage(1);
              }}
              className="lib-clear-filters-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'scholar' ? (
          <div className="partner-scholar-list">
            {paginatedTechnologies.map((technology) => {
              const deptStyle = getDepartmentStyle(technology.department);

              return (
                <article
                  key={technology.id}
                  className="partner-scholar-card"
                  style={{
                    borderTop: `3px solid ${deptStyle.cardTopAccent || '#003A8F'}`
                  }}
                >
                  <div
                    className="partner-scholar-icon-box"
                    style={{
                      background: deptStyle.badgeBg,
                      borderColor: deptStyle.border
                    }}
                  >
                    <i className={`fas ${technology.icon}`} style={{ color: deptStyle.accent }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Link href={`/partner/details?id=${technology.id}`} style={{ textDecoration: 'none' }}>
                      <h3 className="partner-scholar-title">{technology.title}</h3>
                    </Link>
                    <div className="partner-scholar-meta">
                      <strong style={{ color: '#334155' }}>{technology.developers}</strong>
                      <span style={{ color: '#CBD5E1' }}>•</span>
                      <span style={{ color: deptStyle.text, fontWeight: 600 }}>{technology.department}</span>
                      <span style={{ color: '#CBD5E1' }}>•</span>
                      <span>{technology.trl}</span>
                    </div>
                    <p className="partner-scholar-abstract">{technology.abstract}</p>

                    <div className="partner-scholar-footer">
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

                      <span className="partner-readiness-badge">
                        <i className="fas fa-check-circle" style={{ color: '#16A34A', fontSize: '0.75rem' }} aria-hidden="true" />
                        <span>{technology.readinessPercent}% Ready</span>
                      </span>

                      {technology.industries[0] && (
                        <span className="partner-industry-tag">
                          {technology.industries[0]}
                        </span>
                      )}

                      <div className="partner-scholar-actions">
                        <Link
                          href={`/partner/details?id=${technology.id}`}
                          className="partner-details-btn"
                          style={{ padding: '0.45rem 0.95rem' }}
                        >
                          <span>Read Study</span>
                          <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem', color: '#003A8F', marginLeft: '0.25rem' }} aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedTechnologyId(technology.id)}
                          className="partner-adopt-btn"
                          style={{ padding: '0.45rem 1rem' }}
                        >
                          <i className="fas fa-handshake" style={{ color: '#F59E0B' }} aria-hidden="true" />
                          <span>Adopt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : viewMode === 'cards' ? (
          <div className="partner-tech-grid">
            {paginatedTechnologies.map((technology) => {
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
                      <span>Readiness: {technology.trl}</span>
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
                      <strong style={{ color: '#334155', fontWeight: 600 }}>Impact:</strong>
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
        ) : (
          <section className="partner-table-section">
            <div className="table-scroll">
              <table className="lib-modern-table" style={{ width: '100%', minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: '280px' }}>Technology / Project</th>
                    <th style={{ width: '170px', minWidth: '170px' }}>Readiness</th>
                    <th className="lib-col-dept">Department</th>
                    <th style={{ textAlign: 'right', width: '150px', minWidth: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTechnologies.map((technology) => {
                    const deptStyle = getDepartmentStyle(technology.department);

                    return (
                      <tr key={technology.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <div
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '8px',
                                background: deptStyle.badgeBg,
                                border: `1px solid ${deptStyle.border}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}
                            >
                              <i className={`fas ${technology.icon}`} style={{ color: deptStyle.accent, fontSize: '1rem' }} aria-hidden="true" />
                            </div>
                            <div>
                              <Link
                                href={`/partner/details?id=${technology.id}`}
                                style={{
                                  color: '#0F172A',
                                  display: 'block',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                  fontSize: '0.92rem',
                                  lineHeight: 1.35
                                }}
                              >
                                {technology.title}
                              </Link>
                              <span style={{ color: '#64748B', fontSize: '0.8rem' }}>
                                {technology.industries.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ color: '#0F172A', fontWeight: 700, fontSize: '0.85rem', minWidth: '38px' }}>
                              {technology.readinessPercent}%
                            </span>
                            <div style={{ width: '90px', height: '6px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                              <div
                                style={{
                                  width: `${technology.readinessPercent}%`,
                                  background: deptStyle.barFill,
                                  height: '100%',
                                  borderRadius: '999px'
                                }}
                              />
                            </div>
                          </div>
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
                            <span>{technology.department}</span>
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.45rem' }}>
                            <Link
                              href={`/partner/details?id=${technology.id}`}
                              className="partner-action-mini-btn is-report"
                            >
                              <i className="fas fa-eye" style={{ color: '#003A8F', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => setSelectedTechnologyId(technology.id)}
                              className="partner-action-mini-btn is-monitor"
                            >
                              <i className="fas fa-handshake" style={{ color: '#F59E0B', marginRight: '0.35rem', fontSize: '0.72rem' }} aria-hidden="true" />
                              Adopt
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <nav className="lib-pagination" aria-label="Technology Pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
              className="lib-page-nav-btn"
              aria-label="Previous Page"
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '0.75rem', color: currentPage === 1 ? '#94A3B8' : '#003A8F' }} aria-hidden="true" />
              <span>Prev</span>
            </button>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`lib-page-num-btn${page === currentPage ? ' is-active' : ''}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
              className="lib-page-nav-btn"
              aria-label="Next Page"
            >
              <span>Next</span>
              <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', color: currentPage === totalPages ? '#94A3B8' : '#003A8F' }} aria-hidden="true" />
            </button>
          </nav>
        )}
      </div>

      <PartnerModal
        open={Boolean(selectedTechnology)}
        title="Request Adoption"
        narrow
        onClose={() => setSelectedTechnologyId('')}
        footer={
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-outline"
              onClick={() => setSelectedTechnologyId('')}
              style={{ padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontWeight: 600, border: '1px solid #E2E8F0', color: '#475569', background: '#FFFFFF' }}
            >
              Cancel
            </button>
            {selectedTechnology ? (
              <Link
                className="btn btn-primary"
                href={`/partner/request?id=${selectedTechnology.id}`}
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
                <span>Open Request Form</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        }
      >
        <div style={{ padding: '1.25rem 0 0.5rem' }}>
          <p style={{ margin: '0 0 1rem 0', color: '#475569', lineHeight: 1.6, fontSize: '0.92rem' }}>
            You are initiating a formal adoption request for the <strong style={{ color: '#0F172A' }}>{selectedTechnology?.title}</strong> technology. 
          </p>
          <div style={{ background: '#F8FAFC', padding: '1rem 1.2rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.82rem' }}>Department</span>
              <strong style={{ color: '#0F172A', fontSize: '0.85rem' }}>{selectedTechnology?.department}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.82rem' }}>Current TRL</span>
              <strong style={{ color: '#0F172A', fontSize: '0.85rem' }}>{selectedTechnology?.trl}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748B', fontWeight: 600, fontSize: '0.82rem' }}>Readiness Score</span>
              <strong style={{ color: '#16A34A', fontSize: '0.85rem', fontWeight: 700 }}>{selectedTechnology?.readinessPercent}%</strong>
            </div>
          </div>
          <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Proceeding will open the Adoption Request form where you can outline your implementation strategy and budget allocation.
          </p>
        </div>
      </PartnerModal>
    </PartnerShell>
  );
}

