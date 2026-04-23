const DASH_PATTERN = /[\-\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]+/g;

export function stripDashes(value) {
  if (typeof value !== 'string') return value;
  const withoutDashes = value.replace(DASH_PATTERN, '');
  return withoutDashes
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function stripDashesFromObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => (typeof item === 'string' ? stripDashes(item) : stripDashesFromObject(item)));
  }
  return Object.fromEntries(Object.entries(obj).map(([key, val]) => {
    if (typeof val === 'string') return [key, stripDashes(val)];
    if (Array.isArray(val) || (val && typeof val === 'object')) return [key, stripDashesFromObject(val)];
    return [key, val];
  }));
}
