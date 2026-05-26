const assert = require('assert');
const locale = require('../language-switcher.js');

assert.strictEqual(locale.localeForHost('allybi.co'), 'en');
assert.strictEqual(locale.localeForHost('www.allybi.co'), 'en');
assert.strictEqual(locale.localeForHost('allybi.com.br'), 'pt');
assert.strictEqual(locale.localeForHost('www.allybi.com.br'), 'pt');
assert.strictEqual(locale.localeForHost('localhost'), null);

assert.strictEqual(
  locale.getInitialLocale({ hostname: 'allybi.co', search: '?lang=pt' }, fakeStorage('pt')),
  'en'
);
assert.strictEqual(
  locale.getInitialLocale({ hostname: 'allybi.com.br', search: '?lang=en' }, fakeStorage('en')),
  'pt'
);
assert.strictEqual(
  locale.getInitialLocale({ hostname: 'localhost', search: '?lang=pt' }, fakeStorage('en')),
  'pt'
);

assert.strictEqual(locale.canonicalUrlForLocale('en', '/'), 'https://allybi.co');
assert.strictEqual(locale.canonicalUrlForLocale('pt', '/'), 'https://allybi.com.br');
assert.strictEqual(locale.canonicalUrlForLocale('en', '/pricing.html'), 'https://allybi.co/pricing.html');
assert.strictEqual(locale.canonicalUrlForLocale('pt', '/pricing.html'), 'https://allybi.com.br/pricing.html');

assert.strictEqual(
  locale.appUrlForLocale('en', 'https://app.allybi.com.br/login'),
  'https://app.allybi.co/login'
);
assert.strictEqual(
  locale.appUrlForLocale('pt', 'https://app.allybi.co/login'),
  'https://app.allybi.com.br/login'
);

console.log('domain locale smoke tests passed');

function fakeStorage(value) {
  return {
    getItem() {
      return value;
    }
  };
}
