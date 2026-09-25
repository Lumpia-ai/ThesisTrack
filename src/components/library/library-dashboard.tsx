'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LIBRARY_DEPARTMENT_SUMMARY,
  LIBRARY_PROJECTS,
  LIBRARY_RECENT_STUDIES,
  getDepartmentLabel,
  getProjectIcon
} from '@/components/library/library-data';
import { LibraryShell } from '@/components/library/library-shell';

export type DepartmentStyle = {
  accent: string;
  icon: string;
  cardBg: string;
  cardBorder: string;
  cardBorderHover: string;
  cardShadowHover: string;
  cardTopAccent: string;
  badgeBg: string;
  border: string;
  text: string;
  barFill: string;
  trackBg: string;
};

// Official USTP department color palette curated for the minimalist theme
export const MINIMALIST_DEPT_THEMES: Record<string, DepartmentStyle> = {
  IT: {
    accent: '#F59E0B',
    icon: 'fa-laptop-code',
    cardBg: '#FFFDF6',
    cardBorder: '#FDE68A',
    cardBorderHover: '#FCD34D',
    cardShadowHover: 'rgba(245, 158, 11, 0.08)',
    cardTopAccent: '#F59E0B',
    badgeBg: '#FEF3C7',
    border: '#FCD34D',
    text: '#0F172A',
    barFill: '#F59E0B',
    trackBg: '#FEF3C7'
  },
  MET: {
    accent: '#800000',
    icon: 'fa-industry',
    cardBg: '#FFF8F8',
    cardBorder: '#FEE2E2',
    cardBorderHover: '#FECDD3',
    cardShadowHover: 'rgba(128, 0, 0, 0.08)',
    cardTopAccent: '#800000',
    badgeBg: '#FDF2F2',
    border: '#FECDD3',
    text: '#800000',
    barFill: '#800000',
    trackBg: '#FEE2E2'
  },
  TCM: {
    accent: '#700F9D',
    icon: 'fa-broadcast-tower',
    cardBg: '#FAF8FF',
    cardBorder: '#EDE9FE',
    cardBorderHover: '#DDD6FE',
    cardShadowHover: 'rgba(112, 15, 157, 0.08)',
    cardTopAccent: '#700F9D',
    badgeBg: '#F5F3FF',
    border: '#DDD6FE',
    text: '#6D28D9',
    barFill: '#7C3AED',
    trackBg: '#EDE9FE'
  },
  ESM: {
    accent: '#15803D',
    icon: 'fa-bolt',
    cardBg: '#F7FCF8',
    cardBorder: '#DCFCE7',
    cardBorderHover: '#BBF7D0',
    cardShadowHover: 'rgba(21, 128, 61, 0.08)',
    cardTopAccent: '#15803D',
    badgeBg: '#F0FDF4',
    border: '#BBF7D0',
    text: '#166534',
    barFill: '#16A34A',
    trackBg: '#DCFCE7'
  },
  NAME: {
    accent: '#003A8F',
    icon: 'fa-ship',
    cardBg: '#F8FAFF',
    cardBorder: '#DBEAFE',
    cardBorderHover: '#BFDBFE',
    cardShadowHover: 'rgba(0, 58, 143, 0.08)',
    cardTopAccent: '#003A8F',
    badgeBg: '#EFF6FF',
    border: '#BFDBFE',
    text: '#003A8F',
    barFill: '#003A8F',
    trackBg: '#DBEAFE'
  }
};

export function getDepartmentStyle(dept: string): DepartmentStyle {
  return (
    MINIMALIST_DEPT_THEMES[dept] ?? {
      accent: '#64748B',
      icon: 'fa-building-columns',
      cardBg: '#F8FAFC',
      cardBorder: '#E2E8F0',
      cardBorderHover: '#CBD5E1',
      cardShadowHover: 'rgba(15, 23, 42, 0.06)',
      cardTopAccent: '#64748B',
      badgeBg: '#F1F5F9',
      border: '#E2E8F0',
      text: '#475569',
      barFill: '#64748B',
      trackBg: '#E2E8F0'
    }
  );
}

function getTopProject() {
  return [...LIBRARY_PROJECTS].sort((left, right) => right.views - left.views)[0] ?? LIBRARY_PROJECTS[0];
}

export function LibraryDashboard() {
  const router = useRouter();
  const featuredProjects = LIBRARY_PROJECTS.slice(0, 4);
  const topProject = getTopProject();

  return (
    <LibraryShell
      activeNav="dashboard"
      title="Digital Knowledge Vault"
      description="Discover, explore, and reference completed academic research."
      hideHeader={true}
    >
      <div className="lib-dash-wrapper">
        
        {/* Minimalist Hero Section */}
        <section className="lib-dash-hero" aria-labelledby="hero-title">
          <div className="lib-dash-hero-inner">
            <div className="lib-hero-badge">
              <i className="fas fa-university text-amber-600" aria-hidden="true" />
              <span>Institutional Knowledge Vault</span>
              <span className="lib-pulse-dot" aria-hidden="true" />
            </div>

            <h2 id="hero-title" className="lib-hero-title">
              Digital Knowledge <span className="lib-hero-title-accent">Vault</span>
            </h2>
            
            <p className="lib-hero-desc">
              Access and manage thousands of completed academic studies, thesis projects, and technology transfer records across all university departments.
            </p>
            
            <div>
              <Link
                href="/library/repository"
                className="lib-hero-cta"
                title="Browse Repository"
              >
                <i className="fas fa-search" aria-hidden="true" />
                <span>Browse Repository</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
              </Link>
            </div>

            {/* Minimalist Meta Row */}
            <div className="lib-hero-meta-row" aria-label="Vault quick statistics">
              <div className="lib-hero-meta-item">
                <i className="fas fa-book text-amber-600" aria-hidden="true" />
                <span>342 Archived Projects</span>
              </div>
              <span className="lib-hero-meta-sep">•</span>
              <div className="lib-hero-meta-item">
                <i className="fas fa-building-columns text-amber-600" aria-hidden="true" />
                <span>5 Academic Departments</span>
              </div>
              <span className="lib-hero-meta-sep">•</span>
              <div className="lib-hero-meta-item">
                <i className="fas fa-check-circle text-amber-600" aria-hidden="true" />
                <span>Peer-Reviewed &amp; Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Minimalist Stat Cards Grid */}
        <div className="lib-bento-grid">
          
          {/* Card 1: Most Viewed Research */}
          <Link
            href={`/library/project-details?id=${topProject.id}`}
            className="lib-bento-card"
          >
            <div>
              <div className="lib-bento-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="lib-bento-icon-box">
                    <i className="fas fa-crown" style={{ color: '#F59E0B', fontSize: '1rem' }} aria-hidden="true" />
                  </div>
                  <span className="lib-bento-kicker">Most Viewed Research</span>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.35 }}>
                  {topProject.title}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
              <p style={{ margin: 0, color: '#003A8F', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <i className="fas fa-eye" style={{ color: '#003A8F' }} aria-hidden="true" />
                <span>{topProject.views.toLocaleString()} views this semester</span>
              </p>
              <span style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 600 }}>
                View <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }} aria-hidden="true" />
              </span>
            </div>
          </Link>

          {/* Card 2: Published Archives */}
          <div className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="lib-bento-icon-box">
                    <i className="fas fa-archive" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
                  </div>
                  <span className="lib-bento-kicker">Published Archives</span>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">342</div>
                <p className="lib-bento-subtext">Across 5 academic departments</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', color: '#64748B', fontSize: '0.8rem' }}>
              <i className="fas fa-layer-group" style={{ color: '#003A8F' }} aria-hidden="true" />
              <span>Verified institutional repository</span>
            </div>
          </div>

          {/* Card 3: New Additions */}
          <div className="lib-bento-card">
            <div>
              <div className="lib-bento-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="lib-bento-icon-box">
                    <i className="fas fa-chart-line" style={{ color: '#16A34A', fontSize: '1rem' }} aria-hidden="true" />
                  </div>
                  <span className="lib-bento-kicker">New Additions</span>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <div className="lib-bento-metric">18</div>
                <p className="lib-bento-subtext">+4 from last month</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', color: '#64748B', fontSize: '0.8rem' }}>
              <i className="fas fa-clock" style={{ color: '#16A34A' }} aria-hidden="true" />
              <span>Current semester intake</span>
            </div>
          </div>
        </div>

        {/* Minimalist Department Analytics Section with Subtle Department Colors */}
        <section className="lib-dept-section">
          <div className="lib-dept-header">
            <div className="lib-dept-header-title">
              <h3>Departmental Distribution</h3>
              <p>Archived research and project count across all academic units</p>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
              5 Departments Total
            </span>
          </div>

          <div className="lib-dept-grid">
            {LIBRARY_DEPARTMENT_SUMMARY.map((department) => {
              const deptStyle = getDepartmentStyle(department.department);
              const label = getDepartmentLabel(department.department);
              const percent = Math.min(department.count, 100);

              return (
                <div
                  key={department.department}
                  className="lib-dept-card"
                  style={
                    {
                      '--dept-bg': deptStyle.cardBg,
                      '--dept-border': deptStyle.cardBorder,
                      '--dept-border-hover': deptStyle.cardBorderHover,
                      '--dept-shadow-hover': deptStyle.cardShadowHover,
                      '--dept-top-accent': deptStyle.cardTopAccent
                    } as React.CSSProperties
                  }
                >
                  <div>
                    <div className="lib-dept-top">
                      <span
                        className="lib-dept-pill"
                        style={{
                          background: deptStyle.badgeBg,
                          color: deptStyle.text,
                          borderColor: deptStyle.border
                        }}
                      >
                        <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                        <span>{department.department}</span>
                      </span>
                      <strong className="lib-dept-count">{department.count}</strong>
                    </div>

                    <div className="lib-dept-name" title={label}>
                      {label}
                    </div>
                  </div>

                  <div>
                    <div
                      className="lib-dept-progress-track"
                      style={{ background: deptStyle.trackBg }}
                    >
                      <div
                        className="lib-dept-progress-fill"
                        style={{
                          width: `${percent}%`,
                          background: deptStyle.barFill
                        }}
                      />
                    </div>
                    <span className="lib-dept-footer-label">
                      Published Projects
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Minimalist Featured Discoveries */}
        <section className="lib-featured-section">
          <div className="lib-featured-header">
            <div>
              <h3 className="lib-section-heading">Featured Discoveries</h3>
              <p className="lib-section-subheading">Selected research projects with high academic impact</p>
            </div>

            <Link
              href="/library/repository"
              className="lib-featured-link"
            >
              <span>Explore Collection</span>
              <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
            </Link>
          </div>

          <div className="lib-cards-grid">
            {featuredProjects.map((project) => {
              const deptStyle = getDepartmentStyle(project.department);

              return (
                <Link
                  href={`/library/project-details?id=${project.id}`}
                  key={project.id}
                  className="lib-project-card group"
                >
                  <div className="lib-project-card-top">
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
                    
                    <div
                      className="lib-project-type-icon"
                      title={project.type}
                    >
                      <i className={`fas ${getProjectIcon(project.type)}`} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="lib-project-body">
                    <h4>{project.title}</h4>
                    <p className="lib-project-authors">
                      <i className="fas fa-user-graduate text-slate-400" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {project.authors.join(', ')}
                      </span>
                    </p>
                  </div>

                  <div className="lib-project-card-bottom">
                    <span className="lib-project-year">
                      <i className="fas fa-calendar" style={{ fontSize: '0.75rem' }} aria-hidden="true" />
                      <span>{project.year}</span>
                    </span>
                    <span className="lib-project-action-link">
                      <span>View Details</span>
                      <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Minimalist Recently Indexed Archives (Table Section) */}
        <section className="lib-table-section">
          <div className="lib-table-header-bar">
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
                Recently Indexed Archives
              </h3>
              <p style={{ margin: '0.15rem 0 0', fontSize: '0.82rem', color: '#64748B' }}>
                Latest academic research cataloged into the repository
              </p>
            </div>
            
            <div className="lib-live-badge">
              <span className="lib-pulse-dot" aria-hidden="true" />
              <span>Live Index</span>
            </div>
          </div>

          <div className="lib-table-wrap">
            <table className="lib-modern-table">
              <thead>
                <tr>
                  <th>Research Title</th>
                  <th className="lib-col-dept">Department</th>
                  <th>Authors</th>
                  <th style={{ width: '80px', minWidth: '80px' }}>Year</th>
                  <th style={{ textAlign: 'right', width: '100px', minWidth: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {LIBRARY_RECENT_STUDIES.map((study) => {
                  const deptStyle = getDepartmentStyle(study.department);

                  return (
                    <tr
                      key={study.projectId}
                      onClick={() => router.push(`/library/project-details?id=${study.projectId}`)}
                      title={`Click to view ${study.title}`}
                    >
                      <td>
                        <div className="lib-table-title-cell">
                          <div className="lib-table-doc-icon">
                            <i className="fas fa-file-lines" aria-hidden="true" />
                          </div>
                          <span className="lib-table-title-text" title={study.title}>
                            {study.title}
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
                          <span>{study.department}</span>
                        </span>
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.88rem' }}>
                        {study.authors}
                      </td>
                      <td style={{ color: '#64748B', fontWeight: 500, fontSize: '0.85rem' }}>
                        {study.year}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <button
                            type="button"
                            className="lib-action-btn"
                            title="Download PDF"
                            aria-label={`Download PDF for ${study.title}`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <i className="fas fa-file-pdf" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="lib-action-btn"
                            title="Cite"
                            aria-label={`Cite ${study.title}`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <i className="fas fa-quote-right" aria-hidden="true" />
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

      </div>
    </LibraryShell>
  );
}
