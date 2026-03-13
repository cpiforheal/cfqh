export function buildSeedImage(seed, size = '900/600') {
  if (!seed) {
    return '';
  }

  return `https://picsum.photos/seed/${seed}/${size}`;
}

export function resolveMediaUrl(options) {
  if (!options || typeof options !== 'object') {
    return '';
  }

  if (options.url) {
    return options.url;
  }

  if (options.urls && options.size && options.urls[options.size]) {
    return options.urls[options.size];
  }

  if (options.seed) {
    return buildSeedImage(options.seed, options.fallbackSize || '900/600');
  }

  return '';
}
