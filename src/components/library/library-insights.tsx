'use client';

import Link from 'next/link';
import {
  LIBRARY_DEPARTMENT_SUMMARY,
  LIBRARY_EMERGING_TOPICS,
  LIBRARY_KEYWORD_TRENDS,
  LIBRARY_RECOMMENDED_READING,
  LIBRARY_YEAR_COUNTS
} from '@/components/library/library-data';
import { getDepartmentStyle } from '@/components/library/library-dashboard';
import { LibraryShell } from '@/components/library/library-shell';

const RESEARCH_GAPS = [
  'Limited research on AI ethics in education',
  'Few studies on circular economy in ESM',
  'Need for more maritime AI applications'
] as const;

const SUGGESTED_TOPICS = [
  'Explainable AI for educational systems',
  'Blockchain for supply chain transparency',
  'Renewable energy integration with IoT'
] as const;

export function LibraryInsights() {
  return (
    <LibraryShell
      activeNav="insights"
      title="Research Insights & Trends"
      description="Explore research patterns and emerging topics"
    >
      <div className="lib-insights-wrapper">
        
        {/* Row 1: Distribution Analysis */}
        <div className="lib-insights-grid-2">
          
          {/* Projects by Department */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-chart-pie" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Projects by Department</h3>
                  <p className="lib-insights-subtitle">Active distribution across academic units</p>
                </div>
              </div>
            </div>

            <div className="lib-dist-list">
              {LIBRARY_DEPARTMENT_SUMMARY.map((item) => {
                const deptStyle = getDepartmentStyle(item.department);
                const percent = Math.min(item.count, 100);

                return (
                  <div key={item.department} className="lib-dist-row">
                    <div className="lib-dist-label">
                      <span
                        className="lib-dept-pill"
                        style={{
                          background: deptStyle.badgeBg,
                          color: deptStyle.text,
                          borderColor: deptStyle.border
                        }}
                      >
                        <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                        <span>{item.department}</span>
                      </span>
                    </div>

                    <div className="lib-dist-track" style={{ background: deptStyle.trackBg }}>
                      <div
                        className="lib-dist-fill"
                        style={{
                          width: `${percent}%`,
                          background: deptStyle.barFill
                        }}
                      />
                    </div>

                    <div className="lib-dist-count">{item.count}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Projects by Year */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-chart-bar" style={{ color: '#D97706', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Projects by Academic Year</h3>
                  <p className="lib-insights-subtitle">Annual research archiving volume</p>
                </div>
              </div>
            </div>

            <div className="lib-dist-list">
              {LIBRARY_YEAR_COUNTS.map((item) => {
                const percent = (Math.min(item.count, 112) / 112) * 100;
                const barColor =
                  item.tone === 'success'
                    ? '#16A34A'
                    : item.tone === 'muted'
                    ? '#94A3B8'
                    : '#003A8F';

                return (
                  <div key={item.year} className="lib-dist-row">
                    <div className="lib-dist-year-label">
                      <i className="fas fa-calendar" style={{ fontSize: '0.72rem', color: '#94A3B8' }} aria-hidden="true" />
                      <span>{item.year}</span>
                    </div>

                    <div className="lib-dist-track">
                      <div
                        className="lib-dist-fill"
                        style={{
                          width: `${percent}%`,
                          background: barColor
                        }}
                      />
                    </div>

                    <div className="lib-dist-count">{item.count}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Row 2: Trends & Topics */}
        <div className="lib-insights-grid-2">
          
          {/* Most Common Keywords */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-tags" style={{ color: '#0284C7', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Most Common Keywords</h3>
                  <p className="lib-insights-subtitle">Frequently cataloged research tags</p>
                </div>
              </div>
            </div>

            <div className="lib-keyword-cloud">
              {LIBRARY_KEYWORD_TRENDS.map((keyword) => (
                <span key={keyword.label} className="lib-keyword-chip">
                  <span>{keyword.label}</span>
                  <span className="lib-keyword-chip-count">{keyword.count}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Emerging Research Topics */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-arrow-trend-up" style={{ color: '#16A34A', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Emerging Research Topics</h3>
                  <p className="lib-insights-subtitle">Fastest growing thesis domains</p>
                </div>
              </div>
            </div>

            <div className="lib-topic-list">
              {LIBRARY_EMERGING_TOPICS.map((topic) => (
                <div key={topic.label} className="lib-topic-item">
                  <strong className="lib-topic-name">{topic.label}</strong>
                  <span className="lib-topic-growth">
                    <i className="fas fa-arrow-up" style={{ fontSize: '0.65rem' }} aria-hidden="true" />
                    <span>{topic.growth}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Row 3: Strategic Directions */}
        <div className="lib-insights-grid-2">
          
          {/* Identified Research Gaps */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-exclamation-triangle" style={{ color: '#D97706', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Identified Research Gaps</h3>
                  <p className="lib-insights-subtitle">Underexplored areas needing academic study</p>
                </div>
              </div>
            </div>

            <div className="lib-direction-list">
              {RESEARCH_GAPS.map((item) => (
                <div key={item} className="lib-direction-item">
                  <span className="lib-gap-bullet" aria-hidden="true">
                    <i className="fas fa-info" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Topics */}
          <section className="lib-insights-card">
            <div className="lib-insights-header">
              <div className="lib-insights-title-wrap">
                <div className="lib-bento-icon-box">
                  <i className="fas fa-lightbulb" style={{ color: '#8B5CF6', fontSize: '1rem' }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="lib-insights-title">Suggested Topic Opportunities</h3>
                  <p className="lib-insights-subtitle">High-potential research recommendations</p>
                </div>
              </div>
            </div>

            <div className="lib-direction-list">
              {SUGGESTED_TOPICS.map((item) => (
                <div key={item} className="lib-direction-item">
                  <span className="lib-suggest-bullet" aria-hidden="true">
                    <i className="fas fa-check" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Row 4: Recommended Reading */}
        <section className="lib-insights-card">
          <div className="lib-insights-header">
            <div className="lib-insights-title-wrap">
              <div className="lib-bento-icon-box">
                <i className="fas fa-book-open" style={{ color: '#003A8F', fontSize: '1rem' }} aria-hidden="true" />
              </div>
              <div>
                <h3 className="lib-insights-title">Recommended Reading</h3>
                <p className="lib-insights-subtitle">Curated high-impact studies across disciplines</p>
              </div>
            </div>
          </div>

          <div className="lib-reading-grid">
            {LIBRARY_RECOMMENDED_READING.map((item) => {
              const deptStyle = getDepartmentStyle(item.department);

              return (
                <article
                  key={item.title}
                  className="lib-reading-card"
                  style={{ borderTop: `3px solid ${deptStyle.cardTopAccent}` }}
                >
                  <div>
                    <h4 className="lib-reading-card-title">{item.title}</h4>
                    <p className="lib-reading-card-desc">{item.description}</p>
                  </div>

                  <div className="lib-reading-card-footer">
                    <span
                      className="lib-dept-pill"
                      style={{
                        background: deptStyle.badgeBg,
                        color: deptStyle.text,
                        borderColor: deptStyle.border
                      }}
                    >
                      <i className={`fas ${deptStyle.icon}`} style={{ fontSize: '0.68rem' }} aria-hidden="true" />
                      <span>{item.department}</span>
                    </span>

                    <Link
                      href={`/library/project-details?id=${item.projectId}`}
                      className="lib-reading-btn"
                    >
                      <span>View Study</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem' }} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
    </LibraryShell>
  );
}
