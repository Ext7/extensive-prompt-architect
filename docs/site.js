const copy = {
  codex: {
    command: 'codex plugin marketplace add Ext7/extensive-prompt-architect',
    en: {
      note: 'Run this in a terminal, restart the desktop app, then open Plugins → NITI plugins → Extensive Prompt Architect → Install.',
      detail: 'This adds a community GitHub source; the plugin is installed in the app. It does not appear in OpenAI’s official public directory.'
    },
    ru: {
      note: 'Выполните команду в терминале, перезапустите приложение и откройте Plugins → NITI plugins → Extensive Prompt Architect → Install.',
      detail: 'Команда добавляет источник на GitHub; установка происходит в приложении. Плагин не появляется в официальном публичном каталоге OpenAI.'
    }
  },
  claude: {
    command: 'claude plugin marketplace add Ext7/extensive-prompt-architect\nclaude plugin install extensive-prompt-architect@niti-plugins',
    en: {
      note: 'Run both commands in a terminal, then start a new Claude Code session. Invoke /extensive-prompt-architect:prompt-architect.',
      detail: 'This installs from GitHub, not Anthropic’s official directory. Claude desktop and web availability may differ.'
    },
    ru: {
      note: 'Выполните обе команды в терминале и начните новую сессию Claude Code. Вызовите /extensive-prompt-architect:prompt-architect.',
      detail: 'Это установка из GitHub, а не из официального каталога Anthropic. Доступность в Claude на сайте и в приложении может отличаться.'
    }
  },
  other: {
    command: 'npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install cursor\n# Replace cursor with codex, claude, or gemini',
    en: {
      note: 'With Node.js 18+ and npm, run this to copy the standalone skill. Replace cursor with your agent name.',
      detail: 'For other Agent Skills hosts, copy the entire skills/prompt-architect folder into the host’s documented skills directory.'
    },
    ru: {
      note: 'При наличии Node.js 18+ и npm команда скопирует отдельный навык. Замените cursor на название своего агента.',
      detail: 'Для других агентов со стандартом Agent Skills скопируйте папку skills/prompt-architect целиком в каталог навыков агента.'
    }
  }
};

let language = localStorage.getItem('epa-language') === 'ru' ? 'ru' : 'en';
let target = 'codex';

function render() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-ru]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.querySelector('#language').textContent = language === 'en' ? 'RU' : 'EN';
  document.querySelector('#language').setAttribute('aria-label', language === 'en' ? 'Switch to Russian' : 'Switch to English');
  document.querySelector('#install-command').textContent = copy[target].command;
  document.querySelector('#install-note').textContent = copy[target][language].note;
  document.querySelector('#install-detail').textContent = copy[target][language].detail;
  document.querySelectorAll('.tab').forEach(tab => {
    const active = tab.dataset.target === target;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}

document.querySelector('#language').addEventListener('click', () => {
  language = language === 'en' ? 'ru' : 'en';
  localStorage.setItem('epa-language', language);
  render();
});
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  target = tab.dataset.target;
  render();
}));
document.querySelector('#copy').addEventListener('click', async event => {
  try {
    await navigator.clipboard.writeText(copy[target].command);
    event.currentTarget.textContent = language === 'en' ? 'Copied' : 'Скопировано';
    setTimeout(() => event.currentTarget.textContent = language === 'en' ? 'Copy' : 'Копировать', 1400);
  } catch {
    event.currentTarget.textContent = language === 'en' ? 'Select text to copy' : 'Выделите текст';
  }
});
render();
