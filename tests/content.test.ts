import assert from 'node:assert/strict';
import test from 'node:test';
import { projects, publishedPosts, readingTime, services } from '../lib/content';
import { absoluteUrl, productionUrl, site } from '../lib/site';

test('production origin and canonical helper remain stable', () => {
  assert.equal(site.url, productionUrl);
  assert.equal(absoluteUrl('/projects'), 'https://viththiyakaran.co.uk/projects');
  assert.equal(absoluteUrl('/projects?utm_source=cv'), 'https://viththiyakaran.co.uk/projects?utm_source=cv');
});

test('published content excludes drafts and contains required editorial fields', () => {
  assert.ok(publishedPosts.length > 0);
  for (const post of publishedPosts) {
    assert.equal(post.draft, false);
    assert.ok(post.featuredImageAlt);
    assert.ok(readingTime(post) >= 1);
  }
});

test('projects expose honest status, role and implementation boundaries', () => {
  const allowed = new Set(['Live', 'In development', 'Prototype', 'Architecture case study', 'Concept']);
  for (const project of projects) {
    assert.ok(allowed.has(project.status));
    assert.ok(project.role);
    assert.ok(project.technologies.length);
    assert.ok(project.accessibility.length);
    if (project.status !== 'Live') assert.equal(project.demoUrl, undefined);
  }
});

test('service records contain problems, deliverables and audience', () => {
  for (const service of services) {
    assert.ok(service.audience);
    assert.ok(service.problems.length >= 3);
    assert.ok(service.deliverables.length >= 3);
  }
});
