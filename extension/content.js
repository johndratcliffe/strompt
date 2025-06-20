const ICON_SRC = 'data:image/png;base64,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';
const LOADING_ICON_SRC = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8c3R5bGU+CiAgICBAa2V5ZnJhbWVzIHJvdGF0ZUNpcmNsZSB7CiAgICAgIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0KICAgIH0KICAgIAogICAgLnNwaW5uZXIgewogICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7CiAgICAgIGFuaW1hdGlvbjogcm90YXRlQ2lyY2xlIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgfQogIDwvc3R5bGU+CiAgCiAgPGcgY2xhc3M9InNwaW5uZXIiPgogICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSI4IiAvPgogICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwNjZjYyIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtZGFzaGFycmF5PSI3MCAyMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICA8L2c+Cjwvc3ZnPg==';
const DONE_ICON_SRC = 'data:image/png;base64,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';
const ALERT_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABoVBMVEVHcEwjdOARLEw7EhscWqgHEiIQM1sZTpUjduMWXZEictsideEjdN8idN8fW64daL8hZcEjctsbUZQOJEMbVJYbWqIZXbIVP3Yha8wZbqwicdgFCxbiEBsabqwictsaZachbdH7BAQcY7AYU5QjdN4icdkacK8XYpkLKUAjcNcbbKwTT3oYWZoPOFobWKkYWZEZYJgSRGz5BgYibtQcZrAibc4XVIL5Bgb5BQX5BgYcZqYjc975BgYcabQYTZQjcdmLPXUOKkv5CQkXRngeWKcibtMdV6caUZsfY74gackha84icNcibM8hbNAbWKgfZMAHDhkTS3QabqwdXbEYZZ35BgYaaKMgackfXqUfZcAaUZv5BgY0bM8FEBf6BgXMHTIPPl/5BgYhaMf5BgYeYKH5BgbCFykXRoYgZ8Ujd+QacbEieOb6BAQjdd8jd+UacrIdaa4ab64cXJoba6cgZbcdYqQicNX5EBH8cnIhbMoeY6toU534Cgr6Hh51S44/aMf5Fhb6JCTXGCkbZZ4bY5sgeur9ra38NDP+xsb6NDQhaL2qr89iAAAAaXRSTlMA9AQBQhEfJf5v4uvi+xhENbMLBxA0Ky9e+ZEIN9j1WdgSjWHT7u/OM2qxm7NNocbsd5OXZ3obBvHj/scrpFWl+Sf5PT7oI1Ccws2dcYNuyxqDxZ7eWPHZ8+hrIfQcoexfRFG86MBrRqwYFCNtAAAB4UlEQVQ4y3XT91vaQBgH8ISQNAIJe4pAQVw4qsW9wI1V27pbbR2dlztCw3LW3flXN5GHp7l43vPkl7yfu+e9N99QFHGJ7U6nSC5RJkZ9nvPA8oRUFO39HWaKclgBAXgc7ZPNdP5bg3oAMAKTLxAaVbcBoAGHzQhcISsPZFAHad4IvDSoLw34YzKQMWDGAfNWgCDGPQ4odu1l94SbBGSYH0moL9hXjdgNawBCPrLV2csRBmSmIQT5k3Kxp4sljtccqZYrxeJtSWmKe00EMLNdvCspUkGSCoWWcbvrAZje1Ir11dIR9RgA16rogFQIrqYHMMC0pdYxIklNUQYjjW2vW4O4GDBmIdvb858opY/+B60y7/Y7tW6V0kjl9O+sjzQQtiv1rHJaPqmCH1YCYFh/ovtNNS9DeHmR+fzUuHs+npsVAFSDA89ujn5NfRrD77EgCLb71AF4eYP+/L5GH7Az3EvL9uzXGrhA6PrnFZo6MDawkAQ8zQOYQejq+ByhDX3oV3JJgW5+EZi3yPDsHH0/PkJDYX1uLTbn0gzHfYnTsry7dw/6BvXJd8xx0yvjsYhgc/bbw++Hh4b79D26OdPEYlKwjoYO57S0Do6Fd7CvFV30LqsN+FyP/NJUYFL0iKSw/QNZYJS1JD4lgAAAAABJRU5ErkJggg==';


class HelperComponent {
  constructor() {
    this.isOpen = false;
    this.dropdownIndex = null;
    this.containerYOrient = 'down';
    this.containerXOrient = 'right';
    this.iconImg = null;
    this.contentContainer = null;
    this.recommendationsWrapper = null;
    this.menu = null;
    this.customInputs = [];
    this.lastSentText = '';
    this.lastAction = '';
    this.resultsWindow = null;
    this.lastResult = ''
    this.selectedText = ''
    this.keepOpen = false
    this.mouseX = 0
    this.mouseY = 0
    this.stayClosed = false
  }

  async init() {
    const { animateWidthInput, input, shadowContainer, contentContainer, iconImg, menu, positionContainer, header } = await this.createHelperComponent();
    this.header = header
    this.shadowContainer = shadowContainer;
    this.contentContainer = contentContainer;
    this.iconImg = iconImg;
    this.menu = menu;
    this.animateWidthInput = animateWidthInput
    this.positionContainer = positionContainer
    this.input = input
    this.setupEventListeners();
    const contextMenuData = await this.getContextMenuData();
    await this.updateContextMenu(contextMenuData);
    new Outlook()
    new Gmail()
    new YouTube()
    new YouTubeComments()
    new Facebook()
    new Shopify()
    new WooCommerceWordPress()
    new Zendesk()
    new Freshdesk()
    new Intercom()
    new Salesforce()
    new HubSpot()
  }

  async getContextMenuData() {
    const { contextMenuSettings } = await chrome.storage.sync.get('contextMenuSettings');
    return contextMenuSettings || [
      {
        id: 'container-text-assistant',
        label: 'Text Assistant',
        items: [
          { id: 'item-1', label: 'Summarize' },
          { id: 'item-2', label: 'Change Tone' },
          { id: 'item-5', label: 'Reply' },
        ],
      },
      {
        id: 'container-code-assistant',
        label: 'Code Assistant',
        items: [{ id: 'item-4', label: 'Notes' }],
      },
      { id: 'item-3', label: 'Rephrase' },
    ];
  }

  async updateContextMenu(contextMenuData) {
    this.menu.innerHTML = '';
    contextMenuData.forEach((element, index) => {
      const menuItemContainer = document.createElement('div');
      menuItemContainer.classList.add('menu-item-container');

      const menuItemButton = document.createElement('button');
      menuItemButton.classList.add('menu-item-button');
      menuItemButton.textContent = element.label;

      if (element.items) {
        const chevronIcon = document.createElement('i');
        chevronIcon.classList.add('fas', 'chevron-icon', this.dropdownIndex === index ? 'fa-chevron-down' : 'fa-chevron-right');
        menuItemButton.appendChild(chevronIcon);

        const dropdownItemsContainer = document.createElement('div');
        dropdownItemsContainer.classList.add('dropdown-items-container');

        const dropdownItemsInner = document.createElement('div');
        dropdownItemsInner.classList.add('dropdown-items-container-inner');

        element.items.forEach((item) => {
          const dropdownContainer = document.createElement('div');
          dropdownContainer.classList.add('dropdown-item-container');
          const turnArrow = document.createElement('i');
          turnArrow.classList.add('fas', 'turn-icon', 'fa-arrow-turn-up');
          const dropdownItemButton = document.createElement('button');
          dropdownItemButton.classList.add('menu-item-button');
          dropdownItemButton.textContent = item.label;
          dropdownItemButton.dataset.itemId = item.id;

          dropdownItemButton.addEventListener('click', () => this.handleMenuItemClick(item));
          dropdownContainer.appendChild(turnArrow);
          dropdownContainer.appendChild(dropdownItemButton);
          dropdownItemsInner.appendChild(dropdownContainer);
        });

        dropdownItemsContainer.appendChild(dropdownItemsInner);
        menuItemContainer.appendChild(menuItemButton);
        menuItemContainer.appendChild(dropdownItemsContainer);

        menuItemButton.addEventListener('click', () => {
          this.dropdownIndex = this.dropdownIndex === index ? null : index;
          this.updateMenuDisplay();
        });
      } else {
        menuItemButton.classList.add('dropdown-item-button-layer1');
        menuItemButton.dataset.itemId = element.id;
        menuItemContainer.appendChild(menuItemButton);
        menuItemButton.addEventListener('click', () => this.handleMenuItemClick(element));
      }
      this.menu.appendChild(menuItemContainer);
    });
  }

  handleMenuItemClick(item) {
    if (item.id.startsWith('container-')) return;

    // this.lastAction = item.prompt ? 'custom' : item.label;
    this.isOpen = false;
    this.iconImg.src = LOADING_ICON_SRC;
    this.dropdownIndex = null;
    this.updateMenuDisplay();

    chrome.runtime.sendMessage({ type: 'getAiResponse', ...item, text: this.selectedText }, (data) => {
      this.iconImg.src = ICON_SRC;
      if (data.error) return;
      this.lastResult = data.output;
      navigator.clipboard.writeText(data.output);
    });
    /* this.updateResultsWindow() */
  }

  handlePromptEnter(prompt) {
    this.lastAction = 'custom'
    this.isOpen = false;
    this.dropdownIndex = null;
    this.iconImg.src = LOADING_ICON_SRC;
    this.updateMenuDisplay();
    this.input.blur()
    this.input.value = ''
    chrome.runtime.sendMessage(this.selectedText ? { type: 'getAiResponse', text: this.selectedText, prompt } : { type: 'generate', prompt, onetime: true } , (data) => {
      this.iconImg.src = ICON_SRC;
      if (data.error) return;
      this.lastResult = data.output;
      navigator.clipboard.writeText(data.output);
    });
  }

  async createHelperComponent() {
    const shadowContainer = document.createElement('div');
    shadowContainer.id = 'strompt-helper';
    document.body.appendChild(shadowContainer);
  
    const shadow = shadowContainer.attachShadow({ mode: 'open' });
    const positionContainer = document.createElement('div');
    positionContainer.classList.add('position-container');
  
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');
    positionContainer.appendChild(contentContainer);
  
    const style = document.createElement('style');
    style.textContent = this.getStyles();
    shadow.appendChild(style);
    shadow.appendChild(positionContainer);
  
    const googleFont = document.createElement('link');
    googleFont.rel = 'stylesheet';
    googleFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(googleFont);
  
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
  
    const header = document.createElement('div');
    header.classList.add('header');
  
    const iconImg = document.createElement('img');
    iconImg.src = ICON_SRC;
    iconImg.classList.add('strompt-icon');
    iconImg.alt = 'Helper Icon';
  
    const animateWidthInput = document.createElement('div');
    animateWidthInput.classList.add('animate-width', 'animate-width-input');
    const animateInner = document.createElement('div');
    animateInner.classList.add('animate-inner');
  
    const input = document.createElement('input')
    input.classList.add('input')
    input.placeholder = 'Quick prompt...'
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handlePromptEnter(input.value)
    })
    animateInner.appendChild(input);
    animateWidthInput.appendChild(animateInner)
  
    header.appendChild(iconImg);
    header.appendChild(animateWidthInput);
  
    const animateWidthMenu = document.createElement('div');
    animateWidthMenu.classList.add('animate-width', 'animate-width-menu');
  
    const animateHeightMenu = document.createElement('div');
    animateHeightMenu.classList.add('animate-height');
  
    const innerContent = document.createElement('div');
    innerContent.classList.add('animate-inner');
  
    const menu = document.createElement('div');
    menu.classList.add('menu-items');
    innerContent.appendChild(menu);
  
    animateHeightMenu.appendChild(animateWidthMenu);
    animateWidthMenu.appendChild(innerContent);
    contentContainer.appendChild(header);
    contentContainer.appendChild(animateHeightMenu);
  
    return { animateWidthInput, input, shadowContainer, contentContainer, iconImg, updateMenuDisplay: () => this.updateMenuDisplay(), menu, positionContainer, header };
  }

  correctMenuOrientation() {
    this.contentContainer.style.bottom = '';
    this.contentContainer.style.top = '0';
    this.contentContainer.style.flexDirection = 'column';
    this.containerYOrient = 'down';
    if (this.containerYOrient === 'down' && this.contentContainer.getBoundingClientRect().top + this.contentContainer.querySelector('.strompt-icon').getBoundingClientRect().height + this.contentContainer.querySelector('.menu-items').scrollHeight > document.documentElement.clientHeight) {
      this.contentContainer.style.bottom = `-${this.contentContainer.querySelector('.strompt-icon').getBoundingClientRect().height}px`
      this.contentContainer.style.top = '';
      this.contentContainer.style.flexDirection = 'column-reverse';
      this.containerYOrient = 'up';
    }
    this.contentContainer.style.right = 'auto';
    this.contentContainer.style.left = '0';
    this.header.style.flexDirection = 'row';
    this.containerXOrient = 'right';
    this.animateWidthInput.style.marginRight = '6px';
    this.animateWidthInput.style.marginLeft = '0';
    if (this.containerXOrient === 'right' && this.contentContainer.getBoundingClientRect().left + this.contentContainer.querySelector('.menu-items').scrollWidth > document.documentElement.clientWidth) {
      this.contentContainer.style.right = `-${this.contentContainer.querySelector('.strompt-icon').getBoundingClientRect().width}px`
      this.contentContainer.style.left = 'auto';
      this.header.style.flexDirection = 'row-reverse';
      this.containerXOrient = 'left';
      this.animateWidthInput.style.marginRight = '0';
      this.animateWidthInput.style.marginLeft = '6px';
    }
  }
  
  correctMenuPosition() {
    const icon = this.contentContainer.querySelector('.strompt-icon')
    const leftEdge = 0
    const rightEdge = document.documentElement.clientWidth - icon.clientWidth - 2
    const xPos = Math.max(leftEdge, this.mouseX)
    if (xPos > rightEdge && xPos < document.documentElement.clientWidth) {
      this.positionContainer.style.left = rightEdge + window.scrollX + 'px'
    } else {
      this.positionContainer.style.left = xPos + window.scrollX + 'px'
    }
    const topEdge = 10
    const bottomEdge = document.documentElement.clientHeight - icon.clientHeight - 2
    const yPos = Math.max(topEdge, this.mouseY)
    if ((yPos >= bottomEdge - 10 && yPos <= document.documentElement.clientHeight) || yPos > document.documentElement.scrollHeight) {
      this.positionContainer.style.top = bottomEdge + window.scrollY + 'px'
    } else {
      this.positionContainer.style.top = yPos + window.scrollY + 10 + 'px'
    }
  }

  updateMenuDisplay() {
    const text = window.getSelection().toString().trim();
    const animateWidthMenu = this.contentContainer.querySelector('.animate-width-menu');
    const animateHeightMenu = this.contentContainer.querySelector('.animate-height');

    if (this.isOpen) {
      this.animateWidthInput.classList.add('expanded');
      if (text || this.selectedText) {
        animateWidthMenu.classList.add('expanded');
        animateHeightMenu.classList.add('expanded');
      }
    } else {
      this.animateWidthInput.style.marginRight = '0';
      this.animateWidthInput.style.marginLeft = '0';
      this.animateWidthInput.classList.remove('expanded');
      animateWidthMenu.classList.remove('expanded');
      animateHeightMenu.classList.remove('expanded');
    }

    animateHeightMenu.querySelectorAll('.menu-item-container').forEach((itemContainer, idx) => {
      const dropdownItems = itemContainer.querySelector('.dropdown-items-container');
      const chevronIcon = itemContainer.querySelector('.chevron-icon');
      if (dropdownItems && chevronIcon) {
        if (this.dropdownIndex === idx) {
          if (this.containerYOrient === 'down' && this.contentContainer.getBoundingClientRect().bottom + itemContainer.querySelector('.dropdown-item-container').clientHeight > document.documentElement.clientHeight) {
            this.positionContainer.style.transition = 'top 100ms ease'
            this.positionContainer.style.top = `${this.positionContainer.style.top.replace('px', '') - itemContainer.querySelector('.dropdown-item-container').clientHeight}px`
            setTimeout(() => {
              this.positionContainer.style.transition = ''
            }, 100);
          }
          dropdownItems.classList.add('expanded');
          chevronIcon.classList.remove('fa-chevron-right');
          chevronIcon.classList.add('fa-chevron-down');
        } else {
          dropdownItems.classList.remove('expanded');
          chevronIcon.classList.remove('fa-chevron-down');
          chevronIcon.classList.add('fa-chevron-right');
        }
      }
    });
  }

  show() {
    this.contentContainer.style.opacity = '100%'
    this.contentContainer.style.pointerEvents = 'auto'
  }

  hide() {
    this.contentContainer.style.opacity = '0'
    this.contentContainer.style.pointerEvents = 'none'
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = Math.max(Math.min(e.clientX, document.documentElement.clientWidth), 0)
      this.mouseY = Math.max(Math.min(e.clientY, document.documentElement.clientHeight), 0)
    })

    this.contentContainer.addEventListener('mouseenter', () => {
      if (!this.stayClosed) {
        this.isOpen = true
        this.correctMenuOrientation()
        this.updateMenuDisplay()
      }
    });

    this.contentContainer.addEventListener('mouseleave', () => {
      if (!this.keepOpen) {
        this.isOpen = false
        this.dropdownIndex = null
        this.updateMenuDisplay()
      }
    });

    let isSelecting = false;
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.key === ' ') {
        this.keepOpen = true
        this.isOpen = true
        this.show()
        this.correctMenuPosition()
        this.correctMenuOrientation()
        this.updateMenuDisplay()
      }
      if (
        (e.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) ||
        (e.shiftKey && e.ctrlKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) ||
        (e.shiftKey && e.altKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'A')
      ) {
        isSelecting = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (!isSelecting) return;
      setTimeout(() => {
        if (e.shiftKey || e.ctrlKey || e.altKey) return;
        if (['Shift', 'Control', 'Alt'].includes(e.key)) {
          isSelecting = false;
          const text = window.getSelection().toString().trim();
          if (!text) return;
          this.show()
        }
      }, 0);
    });

    let target = null
    document.addEventListener('mousedown', (e) => {
      target = e.target
      if (!this.shadowContainer.contains(target)) {
        this.stayClosed = true
        this.isOpen = false
        this.updateMenuDisplay()
      }
      if (e.composedPath()[0] === this.input) this.keepOpen = true
      else if (this.keepOpen) this.keepOpen = false
    })

    document.addEventListener('selectionchange', () => {
      if (target === this.shadowContainer) return
      const text = window.getSelection().toString().trim()
      if (text) return
      this.selectedText = ''
      this.input.value = ''
      this.hide()
      this.updateMenuDisplay()
    })

    document.addEventListener('mouseup', (e) => {
      setTimeout(() => {
        this.stayClosed = false
        if (target === this.shadowContainer) return
        const text = window.getSelection().toString().trim()
        if (text) {
          this.selectedText = text
          this.correctMenuPosition()
          this.show()
        } else {
          this.selectedText = ''
          this.input.value = ''
          this.hide()
        }
        this.updateMenuDisplay()
      }, 0);
    });

    window.addEventListener('message', async (event) => {
      if (event.source !== window) return;

      const { type, setting } = event.data;
      switch (type) {
        case 'LOGIN':
          chrome.storage.sync.set({ user: { name: setting.name, plan: setting.subscription.plan } });
          break;
        case 'LOGOUT':
          chrome.storage.sync.remove('user');
          break;
        case 'CHANGE_CONTEXT_MENU':
          chrome.storage.sync.set({ contextMenuSettings: setting });
          await this.updateContextMenu(setting);
          break;
        case 'ADD_CUSTOM_ACTION':
          chrome.storage.sync.get('customActions', ({ customActions }) => {
            chrome.storage.sync.set({ customActions: customActions ? [...customActions, setting] : [setting] });
          });
          break;
        case 'REMOVE_ACTION':
          chrome.storage.sync.get('customActions', ({ customActions }) => {
            chrome.storage.sync.set({ customActions: customActions.filter((action) => action.id !== setting) });
          });
          chrome.storage.sync.get('contextMenuSettings', ({ contextMenuSettings }) => {
            chrome.storage.sync.set({
              contextMenuSettings: contextMenuSettings
                .filter((current) => current.id !== setting)
                .map((current) =>
                  current.id.startsWith('item-') ? current : { ...current, items: current.items.filter((item) => item.id !== setting) }
                ),
            });
          });
          chrome.storage.sync.get('smartPasteOptions', ({ smartPasteOptions }) => {
            chrome.storage.sync.set({ smartPasteOptions: smartPasteOptions.filter((option) => option.id !== setting) });
          });
          break;
        case 'CHANGE_SMART_PASTE_OPTIONS':
          chrome.storage.sync.set({ smartPasteOptions: setting });
          break;
        case 'GET_CUSTOM_ACTIONS_AND_CONTEXT_MENU_SETTINGS':
          const contextMenuSettings = await chrome.storage.sync.get('contextMenuSettings');
          const customActions = await chrome.storage.sync.get('customActions');
          window.postMessage({ type: 'RETURN_CUSTOM_ACTIONS_AND_CONTEXT_MENU_SETTINGS', value: { ...contextMenuSettings, ...customActions } }, '*');
          break;
        case 'GET_CUSTOM_ACTIONS_AND_SMART_PASTE_OPTIONS':
          const smartPasteOptions = await chrome.storage.sync.get('smartPasteOptions');
          const customActions2 = await chrome.storage.sync.get('customActions');
          window.postMessage({ type: 'RETURN_CUSTOM_ACTIONS_AND_SMART_PASTE_OPTIONS', value: { ...smartPasteOptions, ...customActions2 } }, '*');
          break;
        case 'GET_CUSTOM_ACTIONS':
          chrome.storage.sync.get('customActions', ({ customActions }) => {
            window.postMessage({ type: 'RETURN_CUSTOM_ACTIONS', value: customActions }, '*');
          });
          break;
      }
    });
  }

  getStyles() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

      :host {
        --blue: #2377e4;
        @media (prefers-color-scheme: light) {
          --bg-primary: #ffffff;
          --text-primary: #000000;
          --border-primary:rgb(228, 228, 228);
          --border-secondary: rgb(228, 228, 228);
          --interactive-hover-bg:rgb(201, 201, 201);
        }
        @media (prefers-color-scheme: dark) {
          --bg-primary: #202124;
          --text-primary: #ffffff;
          --border-primary: #202124;
          --border-secondary: rgb(63, 64, 65);
          --interactive-hover-bg:rgb(122, 122, 122);
        }
        --accent-primary: var(--blue);
        --icon-color: var(--text-primary);
        --input-bg: var(--bg-primary);
        --input-text: var(--text-primary);
        --input-border: var(--border-secondary);
        --input-focus-border: var(--accent-primary);
        --input-focus-outline: var(--accent-primary);
        --shadow-rgb: 0, 0, 0;
        --menu-item-button-bg: var(--bg-primary);
        --menu-item-button-text: var(--text-primary);
        --menu-item-button-hover-bg: var(--interactive-hover-bg);
      }
      button { cursor: pointer; }
      .position-container {
        top: 0; left: 0; position: absolute; z-index: 2147483647;
      }
      .content-container {
        position: absolute; font-family: 'Inter', sans-serif;
        border-radius: 15px; 
        box-shadow: 0 4px 6px -1px rgba(var(--shadow-rgb), 0.1), 0 2px 4px -1px rgba(var(--shadow-rgb), 0.06);
        min-width: max-content;
        border: 1px solid var(--border-primary); 
        z-index: 99999;
        background-color: var(--bg-primary); 
        color: var(--text-primary);
        flex-direction: column;
        align-items: flex-start;
        opacity: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .header { display: flex; align-items: center; width: 100%; }
      .strompt-icon { height: 20px; width: 20px; padding: 6px; }
      .animate-width {
        display: grid; grid-template-columns: 0fr; overflow: hidden; transition: grid-template-columns 100ms ease; width: 100%;
      }
      .animate-width.expanded { grid-template-columns: 1fr; }
      .animate-width-input.expanded {
        margin-right: 6px; padding: 1px;
      }
      .input {
        background: var(--input-bg); 
        color: var(--input-text); 
        border: 1px solid var(--input-border); 
        outline: 1px solid transparent; 
        border-radius: 5px; padding: 2px; width: 100%;
        box-sizing: border-box;
      }
      .input:focus {
        border-color: var(--input-focus-border); 
        outline: 1px solid var(--input-focus-outline);
      }
      .animate-height {
        display: grid; grid-template-rows: 0fr; overflow: hidden; transition: grid-template-rows 100ms ease;
      }
      .animate-height.expanded { grid-template-rows: 1fr; }
      .animate-inner { min-width: 0; display: flex; align-items: center; }
      .menu-items { margin-bottom: 4px; }
      .menu-item-container { margin: 0 4px; }
      .menu-item-button {
        text-align: left; border-radius: 8px;
        padding: 4px 8px; width: 100%; font-size: 14px; display: flex;  white-space: nowrap;
        align-items: center; justify-content: space-between; 
        background: var(--menu-item-button-bg); 
        color: var(--menu-item-button-text);
        border: none; outline: none;
      }
      .menu-item-button:hover {
        background-color: var(--menu-item-button-hover-bg);
      }
      .chevron-icon {
        color: var(--icon-color);
        display: inline-block; margin-left: 4px; font-size: 10px; vertical-align: middle; transition: transform 0.1s ease-in-out;
      }
      .menu-item-button.chevron-icon.fa-chevron-down, .menu-item-button.chevron-icon.fa-chevron-right {
        transform: rotate(0deg);
      }
      .dropdown-items-container {
        overflow: hidden; transition: grid-template-rows 100ms ease; display: grid; grid-template-rows: 0fr;
      }
      .dropdown-items-container.expanded { grid-template-rows: 1fr; }
      .dropdown-items-container-inner { min-height: 0; gap: 0.5rem; }
      .dropdown-item-container { display: flex; justify-content: space-between; align-items: center; padding: 0 0 0 8px; gap: 4px; }
      .turn-icon { font-size: 10px; transform: rotate(90deg); color: var(--icon-color); }
    `;
  }
}

window.addEventListener('load', async () => {
  const helper = await new HelperComponent();
  await helper.init();
});

class Outlook {
  constructor() {
    this.processedReplyButtons = new WeakSet();
    this.setupEventListeners();
  }

  insertGhostReply(ghostText) {
    let inserted = false
    const composeBoxObserver = () => {
      const observer = new MutationObserver(() => {
        const queryComposeBox = document.querySelector('[role="textbox"][contenteditable="true"]');
        if (queryComposeBox) {
          addGhost(queryComposeBox);
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
    const createGhost = () => {
      const ghostDiv = document.createElement('div');
      ghostDiv.className = 'ghost-reply';
      ghostDiv.contentEditable = 'true';
      ghostDiv.style.cssText = `font-family: Calibri, Helvetica, sans-serif; font-size: 12pt; color: #7f7f7f;`;
      ghostDiv.innerText = ghostText;
      ghostDiv.setAttribute('text', 'true');
      return ghostDiv;
    };

    const removeGhost = (composeBox) => {
      Array.from(composeBox.children).filter(el => getComputedStyle(el).color === 'rgb(127, 127, 127)')[0]?.remove()
    }

    const existingGhost = (composeBox) => {
      if (composeBox.has('data-ghost-attached')) return true
      return Array.from(composeBox.children).filter(el => getComputedStyle(el).color === 'rgb(127, 127, 127)').length
    }

    const addGhost = (composeBox) => {
      if (composeBox !== null && !composeBox.hasAttribute('data-ghost-attached')) {
        composeBox.setAttribute('data-ghost-attached', 'true');
        if (composeBox.children[0].innerText === '\n' || composeBox.children[0].innerText === '') composeBox.children[0].remove();
        removeGhost(composeBox)
        if (!inserted) composeBox.appendChild(createGhost());
        composeBox.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !inserted) {
            inserted = true;
            const div = document.createElement('div');
            div.style.cssText = `font-family: Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);`;
            div.innerText = ghostText;
            composeBox.prepend(div);
            removeGhost(composeBox)
          } else if (/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') {
            removeGhost(composeBox)
          } else if (e.key === 'Backspace' && (composeBox.children[0].innerText === '' || composeBox.children[0].innerText === '\n')) {
            inserted = false;
            composeBox.children[0].remove();
            composeBox.prepend(createGhost());
          }
        });
      }
    };
    const composeBox = document.querySelector('[role="textbox"][contenteditable="true"]')
    if (composeBox) addGhost(composeBox)
    else composeBoxObserver()

    const existingButtons = new WeakSet()
    document.querySelectorAll('[aria-label="Show message history"]').forEach(btn => {
      existingButtons.add(btn)
    })
    const observer = new MutationObserver(() => {
      const messageHistoryButton = document.querySelector('[aria-label="Show message history"]');
      if (existingButtons.has(messageHistoryButton) || !messageHistoryButton) return
      messageHistoryButton.addEventListener('click', () => {
        composeBoxObserver()
      })
      observer.disconnect()
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  setupEventListeners() {
    if (window.location.href.includes('https://outlook.live.com')) {
      const observer = new MutationObserver(() => {
        const replyButtons = document.querySelectorAll('button[aria-label="Reply"][role="menuitem"]');
        replyButtons.forEach((btn) => {
          if (this.processedReplyButtons.has(btn)) return;
          this.processedReplyButtons.add(btn);
          btn.addEventListener('click', () => {
            const emailContentEl = document.querySelectorAll('[role="document"]');
            const collapsedEmails = document.querySelectorAll('div._nzWz');
            let text = '';
            for (let i = collapsedEmails.length - 1; i >= 0; i--) {
              text += collapsedEmails[i].innerText + '\n';
            }
            for (let i = emailContentEl.length - 1; i >= 0; i--) {
              text += emailContentEl[i].innerText + '\n';
            }
            chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'Reply', action: 'response' }, res => {
              navigator.clipboard.writeText(res.output);
              this.insertGhostReply(res.output);
            })
            /* const suggestedReply = "Hi there,\nThanks for your message. I'll get back to you shortly.Hi there,\nThanks for your message. I'll get back to you shortly.";
            this.insertGhostReply(suggestedReply) */
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
}

class Gmail {
  constructor() {
    this.processedReplyButtons = new WeakSet();
    this.processedListItems = new WeakSet();
    this.setupEventListeners();
  }

  insertGhostReply(ghostText) {
    let inserted = false
    const composeBoxObserver = () => {
      const observer = new MutationObserver(() => {
        const queryComposeBox = document.querySelector('[role="textbox"][contenteditable="true"][aria-label="Message Body"]');
        if (queryComposeBox) {
          addGhost(queryComposeBox);
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
    const createGhost = () => {
      const ghostDiv = document.createElement('div');
      ghostDiv.className = 'ghost-reply';
      ghostDiv.contentEditable = 'true';
      ghostDiv.style.cssText = `color: #7f7f7f;`;
      ghostDiv.innerText = ghostText;
      ghostDiv.setAttribute('text', 'true');
      return ghostDiv;
    };

    const removeGhost = (composeBox) => {
      Array.from(composeBox.children).filter(el => getComputedStyle(el).color === 'rgb(127, 127, 127)')[0]?.remove()
    }

    const addGhost = (composeBox) => {
      if (composeBox !== null && !composeBox.hasAttribute('data-ghost-attached')) {
        composeBox.setAttribute('data-ghost-attached', 'true');
        if (composeBox.children[0].innerText === '\n' || composeBox.children[0].innerText === '') composeBox.children[0].remove();
        removeGhost(composeBox)
        if (!inserted) composeBox.appendChild(createGhost());
        composeBox.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !inserted) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            composeBox.focus()
            inserted = true;
            const div = document.createElement('div');
            div.style.cssText = `color: rgb(0, 0, 0);`;
            div.innerText = ghostText;
            composeBox.prepend(div);
            removeGhost(composeBox)
          } else if (/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') {
            removeGhost(composeBox)
          } else if (e.key === 'Backspace' && (composeBox.children[0].innerText.length === 1)) {
            inserted = false;
            composeBox.children[0].remove();
            composeBox.prepend(createGhost());
          }
        });
      }
    };
    const composeBox = document.querySelector('[role="textbox"][contenteditable="true"]')
    if (composeBox) addGhost(composeBox)
    else composeBoxObserver()

    const existingButtons = new WeakSet()
    document.querySelectorAll('[aria-label="Show message history"]').forEach(btn => {
      existingButtons.add(btn)
    })
    const observer = new MutationObserver(() => {
      const messageHistoryButton = document.querySelector('[aria-label="Show message history"]');
      if (existingButtons.has(messageHistoryButton) || !messageHistoryButton) return
      messageHistoryButton.addEventListener('click', () => {
        composeBoxObserver()
      })
      observer.disconnect()
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  setupEventListeners() {
    const handleReplyClick = (button, messageFlow) => {
      if (this.processedReplyButtons.has(button)) return;
      this.processedReplyButtons.add(button);
      button.addEventListener('click', () => {
        const text = `Message Flow:\n${messageFlow}\n`
        chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'Reply', action: 'response' }, res => {
          navigator.clipboard.writeText(res.output);
          this.insertGhostReply(res.output);
        })
        /* const suggestedReply = "Hi there,\nThanks for your message. I'll get back to you shortly.Hi there,\nThanks for your message. I'll get back to you shortly.";
        this.insertGhostReply(suggestedReply) */
      });
    }
    if (window.location.href.includes('https://mail.google.com')) {
      const observer = new MutationObserver(() => {
        const listItems = document.querySelectorAll('div[role="listitem"]');
        if (this.processedListItems.has(listItems[0]) || !listItems.length) return
        let messageFlow = ''
        if (listItems.length > 1) {
          listItems.forEach(item => {
            this.processedListItems.add(item)
            messageFlow += item.innerText + '\n'
          })
        } else {
          this.processedListItems.add(listItems[0])
          messageFlow += listItems[0].innerText
        }
        listItems.forEach(item => {
          const replyButtonsType1 = item.querySelector('div[role="button"][aria-label="Reply"]');
          if (replyButtonsType1) handleReplyClick(replyButtonsType1, messageFlow)
          const replyButtonsType2 = item.querySelector('span.ams.bkH[role="link"]');
          if (replyButtonsType2) handleReplyClick(replyButtonsType2, messageFlow)
        })
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
}

class YouTube {
  constructor() {
    this.setupEventListeners()
    this.title = ''
  }

  setupEventListeners() {
    if (window.location.href.includes('https://studio.youtube.com')) {
      const observer = new MutationObserver(() => {
        const query = document.querySelector('#title-textarea')
        if (query === this.title || !query) return
        if (query) this.title = query
        let text = ''
        let aiRes = ''
        let focus = query.getAttribute('focused')
        const descriptionWrapper = document.querySelector('#description-wrapper')
        const textarea = descriptionWrapper.querySelector('#textbox')
        window.addEventListener('click', (e) => {
          if (query.contains(e.target)) focus = true
          else {
            if (focus && query.innerText && text !== query.innerText) {
              text = query.innerText
              chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'Create Youtube Description', action: 'response' }, res => {
                navigator.clipboard.writeText(res.output);
                aiRes = res.output
                textarea.style.color = 'rgb(127, 127, 127)'
                textarea.innerText = aiRes
                textarea.dispatchEvent(new Event('input', { bubbles: true }))
              })
            }
            focus = false
          }
        })
        textarea.addEventListener('keydown', (e) => {
          if (!aiRes) return
          if (e.key === 'Tab') {
            e.preventDefault()
            textarea.style.color = ''
          } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
          textarea.innerText === aiRes && textarea.style.color === 'rgb(127, 127, 127)') {
            textarea.style.color = ''
            textarea.innerText = ''
          } else if (e.key === 'Backspace' && textarea.innerText.length === 1) {
            textarea.style.color = 'rgb(127, 127, 127)'
            textarea.innerText = aiRes
          }
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
}

class YouTubeComments {
  constructor() {
    if (window.location.href.includes('https://www.youtube.com/watch')) {
      let info, title, owner
      const comments = new WeakSet()
      const observer = new MutationObserver(() => {
        const queryInfo = document.querySelector('#above-the-fold')
        if (queryInfo && !info) {
          info = queryInfo
          title = queryInfo.querySelector('#title').innerText
          owner = queryInfo.querySelector('#owner').children[0].innerText
        }
        const queryComments = document.querySelectorAll('#comment')
        queryComments.forEach(comment => {
          if (comments.has(comment)) return
          const headerText = comment.querySelector('#header').innerText
          const commentText = comment.querySelector('#expander').innerText
          comment.querySelector('#reply-button-end').addEventListener('click', () => {
            const text = 'Video Title: ' + title + '\n' + 'Owner: ' + owner + '\n' + 'Commenter: ' + headerText + '\n' + 'Comment: ' + commentText
            chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'Reply to Youtube Comment', action: 'response' }, res => {
              const inputField = comment.querySelector('#contenteditable-root')
              inputField.style.color = 'rgb(127, 127, 127)'
              inputField.innerText = res.output
              inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                  e.preventDefault()
                  inputField.style.color = ''
                } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
                inputField.style.color === 'rgb(127, 127, 127)') {
                  inputField.style.color = ''
                  inputField.innerText = ''
                } else if (e.key === 'Backspace' && inputField.innerText.length === 1) {
                  inputField.style.color = 'rgb(127, 127, 127)'
                  inputField.innerText = res.output
                }
              })
            })
          })
          comments.add(comment)
        })
      })
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }
  }
}

class Facebook {
  constructor() {
    if (window.location.href.includes('https://www.facebook.com')) {
      let labels = []
      let initTexts = []
      let previousText = ''
      let aiRes = ''
      let lastPage = ''
      const observer = new MutationObserver(() => {
        const page = document.querySelector('div[aria-label="Pages"][role="form"]')
        const event = document.querySelector('div[role="dialog"].x1ja2u2z')
        const listing = document.querySelector('div[role="form"][aria-label="Marketplace"]')
        const queryable = page || event || listing
        const current = page ? 'page' : event ? 'event': 'listing'
        if (!page && !event && !listing) return
        if (current !== lastPage) {
          labels = []
          initTexts = []
        }
        lastPage = page ? 'page' : event ? 'event': 'listing'
        queryable.querySelectorAll('label.x78zum5.xh8yej3').forEach(label => {
          if (labels.includes(label)) return
          if (label.innerText?.includes('Postal code') || label.innerText?.includes('email address')) return
          labels.push(label)
          const textArea = label.querySelector('textarea')
          if (textArea) {
            textArea.addEventListener('keydown', (e) => {
              if (e.key === 'Tab' && textArea.style.color === 'rgb(127, 127, 127)') {
                e.preventDefault()
                textArea.style.color = ''
                textArea.value = aiRes
                textArea.dispatchEvent(new Event('input', { bubbles: true }))
              } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
              textArea.style.color === 'rgb(127, 127, 127)') {
                textArea.style.color = ''
                textArea.value = ''
                  textArea.dispatchEvent(new Event('input', { bubbles: true }))
              } else if (e.key === 'Backspace' && (textArea.value.length === 1 || textArea.value.length === 0)) {
                e.preventDefault()
                textArea.style.color = 'rgb(127, 127, 127)'
                textArea.value = aiRes
                textArea.dispatchEvent(new Event('input', { bubbles: true }))
              }
            })
          }
          initTexts.push(label.innerText)
          if (label.innerText.includes('Bio') || label.innerText.includes('What') || label.innerText.includes('Description')) {
            label.addEventListener('click', () => {
              if (labels.filter(l => l !== label).every(l => l.querySelector('input')?.value || initTexts.every(text => text !== l.innerText))) {
                let categories = ''
                initTexts.forEach((text, index) => {
                  const input = labels[index].querySelector('input')
                  if (input) {
                    categories += labels[index].innerText.split('\n').slice(0, -1).join() + ': ' + input.value + '\n'
                  }
                  else if (labels[index] !== label) {
                    categories += text.trim() + ': ' + labels[index].innerText.replace(text.trim(), '') + '\n'
                  }
                })
                const text = categories
                if (text === previousText) return
                previousText = text
                chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: page ? 'Create Facebook Page Bio' : event ? 'Create Facebook Event Details' : 'Create Facebook Marketplace Description', action: 'response' }, res => {
                  aiRes = res.output
                  textArea.style.color = 'rgb(127, 127, 127)'
                  textArea.value = res.output
                  textArea.dispatchEvent(new Event('input', { bubbles: true }))
                })
              }
            })
          }
        })
      })
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }
  }
}

class Shopify {
  constructor() {
    if (window.location.href.includes('shopify.com')) {
      let title, lastReq
      const observer = new MutationObserver(() => {
        const iframe = document.getElementById('product-description_ifr')
        const newTitle = document.querySelector('input')
        let aiRes = ''
        if (newTitle === title || !newTitle || !iframe) return
        title = newTitle
        iframe.addEventListener('load', () => {
          const iframeDoc = iframe.contentDocument
          iframeDoc.addEventListener('click', () => {
            if (lastReq === title.value) return
            lastReq = title.value
            chrome.runtime.sendMessage({ type: 'getAiResponse', text: title.value, label: 'Shopify Product Description', action: 'response' }, res => {
              aiRes = res.output
              iframeDoc.body.children[0].style.color = 'rgb(127, 127, 127)'/* 
              textArea.dispatchEvent(new Event('input', { bubbles: true })) */
              iframeDoc.body.children[0].innerText = res.output
            })
          })
          iframeDoc.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && iframeDoc.body.children[0].style.color === 'rgb(127, 127, 127)') {
              e.preventDefault()
              iframeDoc.body.children[0].style.color = ''
              iframeDoc.body.children[0].innerText = aiRes
              iframeDoc.body.children[0].focus()
            } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
            iframeDoc.body.children[0].style.color === 'rgb(127, 127, 127)') {
              iframeDoc.body.children[0].style.color = ''
              iframeDoc.body.children[0].innerText = ''
            } else if (e.key === 'Backspace' && (iframeDoc.body.children[0].innerText.length === 1 || iframeDoc.body.children[0].innerText.length === 0)) {
              iframeDoc.body.children[0].style.color = 'rgb(127, 127, 127)'
              iframeDoc.body.children[0].innerText = aiRes
              e.preventDefault()
            }
          })
        })
      })
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }
  }
}

class WooCommerceWordPress {
  constructor() {
    this.aiResponseLong = ''
    this.aiResponseShort = ''
    this.lastRequest = ''
    if ((window.location.href.includes('post-new.php?post_type=product') || window.location.href.includes('post.php?')) && window.location.href.includes('wp')) {
      this.init()
    }
  }

  init() {
    const title = new WeakSet()
    const observer = new MutationObserver(() => this.observe(title))
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe(title) {
    const ifrDescription = document.getElementById('content_ifr')
    const ifrShortDescription = document.getElementById('excerpt_ifr')
    const queryTitle = document.querySelector('input[name="post_title"]')
    if (title.has(queryTitle) || !queryTitle) return
    title.add(queryTitle)
    const ifrDocDesc = ifrDescription.contentDocument
    const ifrDocShortDesc = ifrShortDescription.contentDocument
    window.addEventListener('click', (e) => {
      if (queryTitle.contains(e.target)) return
      this.getDoubleRequest(queryTitle, ifrDocDesc, ifrDocShortDesc)
    })
    ifrDocDesc.addEventListener('click', this.getDoubleRequest(queryTitle, ifrDocDesc, ifrDocShortDesc))
    ifrDocDesc.addEventListener('keydown', e => this.keyListener(e, ifrDocDesc, this.aiResponseLong))
    ifrDocShortDesc.addEventListener('click', this.getDoubleRequest(queryTitle, ifrDocDesc, ifrDocShortDesc))
    ifrDocShortDesc.addEventListener('keydown', e => this.keyListener(e, ifrDocShortDesc, this.aiResponseShort))
  }

  getDoubleRequest(queryTitle, ifrDocDesc, ifrDocShortDesc) {
    const text = queryTitle.value
    if (this.lastRequest === text) return
    this.lastRequest = text
    chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'WooCommerce Wordpress Product Description', action: 'response' }, res => {
      this.aiResponseLong = res.output
      ifrDocDesc.body.children[0].style.color = 'rgb(127, 127, 127)'
      ifrDocDesc.body.children[0].innerText = res.output
    })
    chrome.runtime.sendMessage({ type: 'getAiResponse', text, label: 'WooCommerce Wordpress Short Product Description', action: 'response' }, res => {
      this.aiResponseShort = res.output
      ifrDocShortDesc.body.children[0].style.color = 'rgb(127, 127, 127)'
      ifrDocShortDesc.body.children[0].innerText = res.output
    })
  }

  keyListener(e, iframeDoc, aiRes) {
    if (e.key === 'Tab' && iframeDoc.body.children[0].style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      iframeDoc.body.children[0].style.color = ''
      iframeDoc.body.children[0].innerText = aiRes
      iframeDoc.body.children[0].focus()
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    iframeDoc.body.children[0].style.color === 'rgb(127, 127, 127)') {
      iframeDoc.body.children[0].style.color = ''
      iframeDoc.body.children[0].innerText = ''
    } else if (e.key === 'Backspace' && (iframeDoc.body.children[0].innerText.length === 1 || iframeDoc.body.children[0].innerText.length === 0)) {
      iframeDoc.body.children[0].style.color = 'rgb(127, 127, 127)'
      iframeDoc.body.children[0].innerText = aiRes
      e.preventDefault()
    }
  }
}

class Zendesk {
  constructor() {
    this.messages = ''
    this.aiRes = ''
    if (window.location.href.includes('zendesk.com')) this.init()
  }

  init() {
    const articles = new WeakSet()
    const observer = new MutationObserver(() => this.observe(articles))
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe(articles) {
    const queryArticles = document.querySelectorAll('article')
    const queryTextarea = document.querySelector('[role="textbox"][data-test-id="omnicomposer-rich-text-ckeditor"]')
    queryArticles.forEach((article, index) => {
      if (articles.has(article) || !queryTextarea) return
      articles.add(article)
      this.messages += article.innerText + '\n'
      if (index !== queryArticles.length - 1) return
      chrome.runtime.sendMessage({ type: 'getAiResponse', text: this.messages, label: 'Zendesk Reply', action: 'response' }, res => {
        this.messages = 0
        queryTextarea.style.color = 'rgb(127, 127, 127)'
        this.aiRes = res.output
        this.pasteRes(queryTextarea)
      })
      document.addEventListener('keydown', (e) => this.keyListener(e, queryTextarea), true)
    })
  }

  keyListener(e, textarea) {
    if (e.target !== textarea) return
    if (e.key === 'Tab' && textarea.style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      e.stopPropagation()
      textarea.style.color = ''
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    textarea.style.color === 'rgb(127, 127, 127)') {
      textarea.style.color = ''
      this.removeRes(textarea)
    } else if (e.key === 'Backspace' && (textarea.innerText.length === 1 || textarea.innerText.length === 0)) {
      textarea.style.color = 'rgb(127, 127, 127)'
      setTimeout(() => {
        this.pasteRes(textarea)
      }, 0);
    }
  }

  pasteRes(textarea) {
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/plain', this.aiRes);
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData
    });
    textarea.dispatchEvent(pasteEvent); 
  }

  removeRes(textarea) {
    const selection = window.getSelection();
    const range = document.createRange()
    range.selectNodeContents(textarea)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

class Freshdesk {
  constructor() {
    this.buttons = new WeakSet()
    this.messages = ''
    this.aiRes = ''
    if (window.location.href.includes('freshdesk.com')) this.init()
  }

  init() {
    const observer = new MutationObserver(() => this.observe())
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe() {
    const queryButton1 = document.querySelector('[data-test-email-action="reply"]')
    const queryButton2 = document.querySelector('[data-test-email-action-btn="reply"]')
    const tickets = document.querySelectorAll('[data-test-id="ticket-description"]')
    if (!queryButton1 || !queryButton2 || this.buttons.has(queryButton1) || this.buttons.has(queryButton2)) return
    tickets.forEach(ticket => {
      this.messages += ticket.innerText
    })
    this.buttons.add(queryButton1)
    this.buttons.add(queryButton2)
    queryButton1.addEventListener('click', this.clickListener)
    queryButton2.addEventListener('click', this.clickListener)
  }

  clickListener = () => {
    chrome.runtime.sendMessage({ type: 'getAiResponse', text: this.messages, label: 'Freshdesk Reply', action: 'response' }, res => {
      this.messages = ''
      this.aiRes = res.output
      const queryTextarea = document.querySelector('[role="textbox"]')
      queryTextarea.innerText = res.output
      queryTextarea.focus()
      queryTextarea.style.color = 'rgb(127 ,127, 127)'
      queryTextarea.addEventListener('keydown', e => this.keyListener(e, queryTextarea))
    })
  }

  keyListener(e, textarea) {
    if (e.key === 'Tab' && textarea.style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      e.stopPropagation()
      textarea.style.color = ''
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    textarea.style.color === 'rgb(127, 127, 127)') {
      textarea.style.color = ''
      textarea.innerText = ''
    } else if (e.key === 'Backspace' && (textarea.innerText.length === 1 || textarea.innerText.length === 0)) {
      textarea.style.color = 'rgb(127, 127, 127)'
      textarea.innerText = this.aiRes
    }
  }
}

class Intercom {
  constructor() {
    this.messageAreaInnertexts = []
    this.aiRes = ''
    if (window.location.href.includes('intercom.com')) this.init()
  }

  init() {
    const observer = new MutationObserver(() => this.observe())
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe() {
    const container = document.querySelector('[data-intercom-target="conversation-space"]')
    const messageArea = container?.querySelector('[data-conversation-stream]')
    const queryTextarea = container?.querySelector('[role="textbox"]')
    if (!messageArea || !queryTextarea || this.messageAreaInnertexts.includes(messageArea.innerText) || 
    messageArea.innerText.includes('And 1 item before') || messageArea.innerText === '' || !queryTextarea.children.length) return
    this.messageAreaInnertexts.push(messageArea.innerText)
    chrome.runtime.sendMessage({ type: 'getAiResponse', text: messageArea.innerText, label: 'Intercom Reply', action: 'response' }, res => {
      this.aiRes = res.output
      container.querySelector('[role="textbox"]').style.color = 'rgb(127 ,127, 127)'
      container.querySelector('[role="textbox"]').addEventListener('keydown', e => this.keyListener(e, container)) 
      container.querySelector('[role="textbox"]').innerText = res.output
    })
  }

  keyListener(e, container) {
    if (e.key === 'Tab' && container.querySelector('[role="textbox"]').style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      e.stopPropagation()
      container.querySelector('[role="textbox"]').style.color = ''
      container.querySelector('[role="textbox"]').dispatchEvent(new Event('input', { bubbles: true }))
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    container.querySelector('[role="textbox"]').style.color === 'rgb(127, 127, 127)') {
      container.querySelector('[role="textbox"]').style.color = ''
      container.querySelector('[role="textbox"]').innerText = ''
    } else if (e.key === 'Backspace' && (container.querySelector('[role="textbox"]').innerText.length === 1 || container.querySelector('[role="textbox"]').innerText.length === 0)) {
      container.querySelector('[role="textbox"]').style.color = 'rgb(127, 127, 127)'
      container.querySelector('[role="textbox"]').innerText = this.aiRes
    }
  }
}

class Salesforce {
  constructor() {
    this.content = ''
    this.aiRes = ''
    this.sections = new WeakSet()
    this.ifrs = new WeakSet()
    this.clickTimeout = null
    this.ifr = null
    if (window.location.href.includes('lightning.force.com')) this.init()
  }

  init() {
    const observer = new MutationObserver(() => this.observe())
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe() {
    const queryIfr = document.querySelector('iframe')
    const sections = document.querySelectorAll('.test-id__section')
    const replyButton = document.querySelector('button[title="Email"]')
    if (!this.ifrs.has(queryIfr) && queryIfr) {
      this.ifrs.add(queryIfr)
      queryIfr.addEventListener('load', () => {
        queryIfr.contentDocument.body.addEventListener('keydown', e => this.keyListener(e, queryIfr))
      })
      this.ifr = queryIfr
    }
    if (!replyButton) return
    let text = ''
    let label = ''
    sections.forEach(section => {
      if (!section.innerText.includes('Description Information') || this.sections.has(section)) return
      label = 'Salesforce Reply'
      this.sections.add(section)
      section.querySelectorAll('.test-id__field-value').forEach(span => {
        text += span.innerText
      })
    })
    replyButton.addEventListener('click', () => {
      if (this.clickTimeout) return
      const name = document.querySelector('lightning-formatted-name')
      if (name) {
        label = 'Salesforce Outreach'
        text += name.innerText
        document.querySelectorAll('lightning-formatted-text').forEach(elem => {
          text += elem.innerText
        })
      }
      this.clickTimeout = setTimeout(() => {
        this.clickTimeout = null
      }, 500);
      chrome.runtime.sendMessage({ type: 'getAiResponse', text, label, action: 'response' }, res => {
        this.aiRes = res.output
        this.ifr.contentDocument.body.children[0].style.color = 'rgb(127, 127, 127)'
        this.ifr.contentDocument.body.children[0].innerText = res.output
        this.ifr.contentDocument.body.focus()
      })
    })
  }

  keyListener(e) {
    if (e.key === 'Tab' && this.ifr.contentDocument.body.children[0].style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      e.stopPropagation()
      this.ifr.contentDocument.body.children[0].style.color = ''
      this.ifr.contentDocument.body.focus()
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    this.ifr.contentDocument.body.children[0].style.color === 'rgb(127, 127, 127)') {
      this.ifr.contentDocument.body.children[0].style.color = ''
      this.ifr.contentDocument.body.children[0].innerText = ''
    } else if (e.key === 'Backspace' && (this.ifr.contentDocument.body.children[0].innerText.length === 1 || this.ifr.contentDocument.body.children[0].innerText.length === 0)) {
      this.ifr.contentDocument.body.children[0].style.color = 'rgb(127, 127, 127)'
      this.ifr.contentDocument.body.children[0].innerText = this.aiRes
    }
  }
}

class HubSpot {
  constructor() {
    this.aiRes = ''
    this.aboutPages = new WeakSet()
    if (window.location.href.includes('hubspot.com')) this.init()
  }

  init() {
    const observer = new MutationObserver(() => this.observe())
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  observe() {
    const about = document.querySelector('[data-test-id="crm-card-content"]')
    const replyButton = document.querySelector('[data-test-id="create-engagement-email-button"]')
    if (this.aboutPages.has(about) || !about) return
    this.aboutPages.add(about)
    replyButton.addEventListener('click', () => {
      const ticket = document.querySelector('[data-selenium-test="ticket-highlight-details"]')
      const contact = document.querySelector('[data-selenium-test="contact-highlight-details"]')
      const company = document.querySelector('[data-selenium-test="company-highlight-details"]')
      const label = ticket ? 'HubSpot Reply' : 'HubSpot Outreach'
      const headerDetails = (ticket || contact || company).querySelector('ul').innerText
      let details = ''
      Array.from(document.querySelector('[data-selenium-test="profile-properties-list"]').children).forEach(item => {
        const value = item.querySelector('textarea')?.value
        if (value) {
          details += item.querySelector('label').innerText + ': ' + value + '\n'
        } else {
          const toBeAdded = item.innerText.replace('Details', '').trim().replace('\n', ': ')
          if (toBeAdded.includes(':')) details += toBeAdded + '\n'
        }
      })
      const text = headerDetails + '\n' + details
      /* chrome.runtime.sendMessage({ type: 'getAiResponse', text: about.innerText, label, action: 'response' }, res => {
        this.aiRes = res.output
        const textbox = document.querySelector('[data-test-id="rte-content"]')
        if (textbox) this.textboxDefined(textbox)
        this.textboxUndefined()
      }) */

      setTimeout(() => {
        this.aiRes = text
        const textbox = document.querySelector('[data-test-id="rte-content"]')
        if (textbox) this.textboxDefined(textbox)
        this.textboxUndefined()
      }, 10);
    })
  }

  textboxUndefined() {
    const textboxObserver = new MutationObserver(() => {
      const textbox = document.querySelector('[data-test-id="rte-content"]')
      if (!textbox) return
      this.textboxDefined(textbox)
      textboxObserver.disconnect()
    })
    textboxObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  textboxDefined(textbox) {
    textbox.innerText = this.aiRes
    textbox.style.color = 'rgb(127, 127, 127)'
    textbox.removeEventListener('keydown', e => this.keyListener(e, textbox))
    textbox.addEventListener('keydown', e => this.keyListener(e, textbox))
  }

  keyListener = (e, textbox) => {
    if (e.key === 'Tab' && textbox.style.color === 'rgb(127, 127, 127)') {
      e.preventDefault()
      e.stopPropagation()
      textbox.style.color = ''
    } else if ((/^[a-zA-Z]$/.test(e.key) || /^[0-9]$/.test(e.key) || /^[\x20-\x7E]$/.test(e.key) || e.key === 'Enter') && 
    textbox.style.color === 'rgb(127, 127, 127)') {
      textbox.style.color = ''
      textbox.innerText = ''
    } else if (e.key === 'Backspace' && (textbox.innerText.length === 1 || textbox.innerText.length === 0)) {
      textbox.style.color = 'rgb(127, 127, 127)'
      textbox.innerText = this.aiRes
    }
  }
}