'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LIBRARY_PROJECTS,
  type LibraryDepartment,
  type LibraryProject,
  type LibraryProjectType,
  getProjectIcon
} from '@/components/library/library-data';
import { getDepartmentStyle } from '@/components/library/library-dashboard';
import { LibraryShell } from '@/components/library/library-shell';

const ITEMS_PER_PAGE = 6;

function matchesSearch(project: LibraryProject, search: string) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return (
    project.title.toLowerCase().includes(query) ||
    project.authors.join(' ').toLowerCase().includes(query) ||
    project.keywords.join(' ').toLowerCase().includes(query)
  );
}

export function LibraryBrowse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [department, setDepartment] = useState<'all' | LibraryDepartment>('all');
  const [year, setYear] = useState<'all' | string>('all');
  const [projectType, setProjectType] = useState<'all' | LibraryProjectType>('all');
  const [view, setView] = useState<'card' | 'table'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedProjectIds, setSavedProjectIds] = useState<number[]>([]);

  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
    setCurrentPage(1);
  }, [searchParams]);

  const filteredProjects = LIBRARY_PROJECTS.filter((project) => {
    if (department !== 'all' && project.department !== department) {
      return false;
    }

    if (year !== 'all' && String(project.year) !== year) {
      return false;
    }

    if (projectType !== 'all' && project.type !== projectType) {
      return false;
    }

    return matchesSearch(project, search);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  function toggleSaved(projectId: number) {
    setSavedProjectIds((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId]
    );
  }

  const hasActiveFilters = Boolean(
    search.trim() || department !== 'all' || year !== 'all' || projectType !== 'all'
  );

  function resetAllFilters() {
    setSearch('');
    setDepartment('all');
    setYear('all');
    setProjectType('all');
    setCurrentPage(1);
  }

  return (
    <LibraryShell
      activeNav="browse"
      title="Browse Repository"
      description="Search and discover completed research projects"
      hideHeader={true}
    >
      <div className="lib-browse-wrapper">
        
        {/* Minimalist Page Header Bar */}
        <div className="lib-browse-header">
          <div className="lib-browse-header-copy">
            <h2>Browse Repository</h2>
            <p>Search, filter, and reference verified university research projects</p>
          </div>
          <div className="lib-browse-stats-badge">
            <i className="fas fa-layer-group text-slate-400" aria-hidden="true" />
            <span>
              Showing {filteredProjects.length} of {LIBRARY_PROJECTS.length} Studies
            </span>
          </div>
        </div>

        {/* Minimalist Filter Bar */}
        <section className="lib-filter-card" aria-label="Repository Filters">
          <div className="lib-filter-row">
            
            {/* Search Input */}
            <div className="lib-filter-field" style={{ flex: '2 1 260px' }}>
              <label htmlFor="library-search" className="lib-filter-label">Search Repository</label>
              <div className="lib-search-input-wrap">
                <i className="fas fa-search lib-search-input-icon" aria-hidden="true" />
                <input
                  id="library-search"
                  placeholder="Title, author, or keyword..."
                  type="text"
                  className="lib-search-input"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="lib-filter-field" style={{ flex: '1 1 150px' }}>
              <label htmlFor="library-department" className="lib-filter-label">Department</label>
              <div className="lib-select-wrap">
                <select
                  id="library-department"
                  className="lib-filter-select"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event.target.value as 'all' | LibraryDepartment);
                    setCurrentPage(1);
                  }}
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

            {/* Year Filter */}
            <div className="lib-filter-field" style={{ flex: '1 1 110px' }}>
              <label htmlFor="library-year" className="lib-filter-label">Year</label>
              <div className="lib-select-wrap">
                <select
                  id="library-year"
                  className="lib-filter-select"
                  value={year}
                  onChange={(event) => {
                    setYear(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <i className="fas fa-chevron-down lib-select-chevron" aria-hidden="true" />
              </div>
            </div>

            {/* Type Filter */}
            <div className="lib-filter-field" style={{ flex: '1 1 150px' }}>
              <label htmlFor="library-type" className="lib-filter-label">Research Type</label>
              <div className="lib-select-wrap">
                <select
                  id="library-type"
                  className="lib-filter-select"
                  value={projectType}
                  onChange={(event) => {
                    setProjectType(event.target.value as 'all' | LibraryProjectType);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="Web-Based">Web-Based</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="IoT System">IoT System</option>
                  <option value="AI/ML System">AI/ML System</option>
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
                  onClick={() => setView('card')}
                  className={`lib-view-toggle-btn${view === 'card' ? ' is-active' : ''}`}
                  title="Card View"
                >
                  <i className="fas fa-th-large" aria-hidden="true" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('table')}
                  className={`lib-view-toggle-btn${view === 'table' ? ' is-active' : ''}`}
                  title="Table View"
                >
                  <i className="fas fa-list" aria-hidden="true" />
                  <span>Table</span>
                </button>
              </div>
            </div>
            
          </div>

          {/* Active Filter Pills Row */}
          {hasActiveFilters && (
            <div className="lib-active-filters-row">
              <span style={{ color: '#94A3B8', fontWeight: 600 }}>Active filters:</span>
              {search.trim() && (
                <span className="lib-filter-tag">
                  <span>Search: &ldquo;{search.trim()}&rdquo;</span>
                  <button type="button" className="lib-filter-tag-remove" onClick={() => { setSearch(''); setCurrentPage(1); }} aria-label="Clear search">
                    <i className="fas fa-times" />
                  </button>
                </span>
              )}
              {department !== 'all' && (
                <span className="lib-filter-tag">
                  <span>Dept: {department}</span>
                  <button type="button" className="lib-filter-tag-remove" onClick={() => { setDepartment('all'); setCurrentPage(1); }} aria-label="Clear department">
                    <i className="fas fa-times" />
                  </button>
                </span>
              )}
              {year !== 'all' && (
                <span className="lib-filter-tag">
                  <span>Year: {year}</span>
                  <button type="button" className="lib-filter-tag-remove" onClick={() => { setYear('all'); setCurrentPage(1); }} aria-label="Clear year">
                    <i className="fas fa-times" />
                  </button>
                </span>
              )}
              {projectType !== 'all' && (
                <span className="lib-filter-tag">
                  <span>Type: {projectType}</span>
                  <button type="button" className="lib-filter-tag-remove" onClick={() => { setProjectType('all'); setCurrentPage(1); }} aria-label="Clear type">
                    <i className="fas fa-times" />
                  </button>
                </span>
              )}
              <button type="button" className="lib-clear-all-link" onClick={resetAllFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Results Container */}
        {!filteredProjects.length ? (
          <div className="lib-empty-state">
            <div className="lib-empty-state-icon">
              <i className="fas fa-search" aria-hidden="true" />
            </div>
            <div>
              <h3 className="lib-empty-state-title">No matching projects found</h3>
              <p className="lib-empty-state-text">
                We couldn&apos;t find any research studies matching your active filters. Try adjusting keywords or clearing search criteria.
              </p>
            </div>
            {hasActiveFilters && (
              <button type="button" className="lib-clear-filters-btn" onClick={resetAllFilters}>
                Reset all filters
              </button>
            )}
          </div>
        ) : view === 'card' ? (
          <div className="lib-browse-grid">
            {paginatedProjects.map((project) => {
              const isSaved = savedProjectIds.includes(project.id);
              const deptStyle = getDepartmentStyle(project.department);

              return (
                <article
                  key={project.id}
                  className="lib-browse-card"
                  style={
                    {
                      '--dept-border': deptStyle.cardBorder,
                      '--dept-border-hover': deptStyle.cardBorderHover,
                      '--dept-shadow-hover': deptStyle.cardShadowHover,
                      '--dept-top-accent': deptStyle.cardTopAccent
                    } as React.CSSProperties
                  }
                >
                  <div>
                    <div className="lib-browse-card-top">
                      <span
                        className="lib-dept-pill"
                        style={{
                          background: deptStyle.badgeBg,
                          color: deptStyle.text,
                          borderColor: deptStyle.border
                        }}
                      >
                        <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                        <span>{project.department}</span>
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <div className="lib-project-type-icon" title={project.type}>
                          <i className={`fas ${getProjectIcon(project.type)}`} aria-hidden="true" />
                        </div>
                        <button
                          type="button"
                          aria-label={isSaved ? 'Remove from saved projects' : 'Save project'}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaved(project.id);
                          }}
                          className={`lib-bookmark-btn${isSaved ? ' is-saved' : ''}`}
                          title={isSaved ? 'Saved to bookmarks' : 'Bookmark project'}
                        >
                          <i className={`${isSaved ? 'fas' : 'far'} fa-bookmark`} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.75rem' }}>
                      <Link
                        href={`/library/project-details?id=${project.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <h3 className="lib-browse-card-title">{project.title}</h3>
                      </Link>
                      <p className="lib-browse-card-authors">
                        <i className="fas fa-user-graduate text-slate-400" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {project.authors.join(', ')}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="lib-browse-card-meta">
                      <div className="lib-browse-card-meta-row">
                        <span>Adviser: <strong style={{ color: '#334155' }}>{project.adviser}</strong></span>
                        <strong style={{ color: '#0F172A' }}>{project.year}</strong>
                      </div>
                      <div className="lib-browse-card-meta-row">
                        <span>Type: {project.type}</span>
                        <span style={{ color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <i className="fas fa-eye text-slate-400" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
                          <span>{project.views}</span>
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: '0.85rem' }}>
                      <Link
                        href={`/library/project-details?id=${project.id}`}
                        className="lib-browse-card-cta"
                        style={{ width: '100%' }}
                      >
                        <span>View Details</span>
                        <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="lib-browse-table-card">
            <div className="lib-table-wrap">
              <table className="lib-modern-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th className="lib-col-dept">Department</th>
                    <th>Authors</th>
                    <th style={{ width: '80px', minWidth: '80px' }}>Year</th>
                    <th>Adviser</th>
                    <th style={{ textAlign: 'right', width: '100px', minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjects.map((project) => {
                    const deptStyle = getDepartmentStyle(project.department);
                    const isSaved = savedProjectIds.includes(project.id);

                    return (
                      <tr
                        key={project.id}
                        onClick={() => router.push(`/library/project-details?id=${project.id}`)}
                        title={`Click to view ${project.title}`}
                      >
                        <td>
                          <div className="lib-table-title-cell">
                            <div className="lib-table-doc-icon">
                              <i className={`fas ${getProjectIcon(project.type)}`} aria-hidden="true" />
                            </div>
                            <span className="lib-table-title-text" title={project.title}>
                              {project.title}
                            </span>
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
                            <span>{project.department}</span>
                          </span>
                        </td>
                        <td style={{ color: '#475569', fontSize: '0.88rem' }}>
                          {project.authors.join(', ')}
                        </td>
                        <td style={{ color: '#64748B', fontWeight: 500, fontSize: '0.85rem' }}>
                          {project.year}
                        </td>
                        <td style={{ color: '#64748B', fontSize: '0.88rem' }}>
                          {project.adviser}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                            <button
                              type="button"
                              className={`lib-bookmark-btn${isSaved ? ' is-saved' : ''}`}
                              title={isSaved ? 'Saved' : 'Save'}
                              aria-label={isSaved ? 'Remove from saved' : 'Save project'}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaved(project.id);
                              }}
                            >
                              <i className={`${isSaved ? 'fas' : 'far'} fa-bookmark`} aria-hidden="true" />
                            </button>
                            <Link
                              href={`/library/project-details?id=${project.id}`}
                              className="lib-action-btn"
                              title="View Details"
                              onClick={(e) => e.stopPropagation()}
                              style={{ textDecoration: 'none' }}
                            >
                              <i className="fas fa-chevron-right" aria-hidden="true" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Minimalist Pagination */}
        {filteredProjects.length > 0 && totalPages > 1 && (
          <nav className="lib-pagination" aria-label="Browse Pagination">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="lib-page-nav-btn"
              aria-label="Previous Page"
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
              <span>Prev</span>
            </button>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`lib-page-num-btn${pageNumber === safeCurrentPage ? ' is-active' : ''}`}
                  aria-current={pageNumber === safeCurrentPage ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="lib-page-nav-btn"
              aria-label="Next Page"
            >
              <span>Next</span>
              <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
            </button>
          </nav>
        )}

      </div>
    </LibraryShell>
  );
}
