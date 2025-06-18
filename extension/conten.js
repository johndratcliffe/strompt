
const POST_ACTIONS = {
  Summarize: [
    'Make Shorter', 'Make Clearer', 'Highlight Key Ideas'
  ],
  Rephrase: [
    'Try different tone', 'Simplify further', 'Add variety', 'Preserve structure'
  ]
}

class HelperComponent {
  constructor() {
    this.isOpen = false;
    this.dropdownIndex = null;
    this.containerYOrient = 'down';
    this.containerXOrient = 'right';
    this.iconImg = null;
    this.container = null;
    this.recommendationsWrapper = null;
    this.menu = null;
    this.customInputs = [];
    this.lastSentText = '';
    this.lastAction = '';
    this.resultsWindow = null;
    this.lastResult = ''
    this.selectedText = ''
  }

  async init() {
    const { promptWrapper, shadowContainer, container, iconImg, menu, stromptResultsWindow } = await this.createHelperComponent();
    this.shadowContainer = shadowContainer;
    this.container = container;
    this.iconImg = iconImg;
    this.menu = menu;
    this.resultsWindow = stromptResultsWindow;
    this.promptWrapper = promptWrapper
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
      menuItemContainer.classList.add('strompt-menu-item-container');

      const menuItemButton = document.createElement('button');
      menuItemButton.classList.add('strompt-menu-item-button');
      menuItemButton.textContent = element.label;

      if (element.items) {
        const chevronIcon = document.createElement('i');
        chevronIcon.classList.add('fas', 'strompt-chevron-icon', this.dropdownIndex === index ? 'fa-chevron-down' : 'fa-chevron-right');
        menuItemButton.appendChild(chevronIcon);

        const dropdownItemsContainer = document.createElement('div');
        dropdownItemsContainer.classList.add('strompt-dropdown-items');

        const dropdownItemsInner = document.createElement('div');
        dropdownItemsInner.classList.add('strompt-dropdown-items-inner');

        element.items.forEach((item) => {
          const dropdownContainer = document.createElement('div');
          dropdownContainer.classList.add('strompt-dropdown-container');
          const turnArrow = document.createElement('i');
          turnArrow.classList.add('fas', 'strompt-turn-icon', 'fa-arrow-turn-up');
          const dropdownItemButton = document.createElement('button');
          dropdownItemButton.classList.add('strompt-dropdown-item-button');
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
        menuItemButton.classList.add('strompt-dropdown-item-button', 'strompt-dropdown-item-button-layer1');
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
    this.iconImg.src = LOADING_ICON_SRC;
    this.updateMenuDisplay();

    chrome.runtime.sendMessage(this.selectedText ? { type: 'getAiResponse', text: this.selectedText, prompt } : { type: 'generate', prompt } , (data) => {
      this.iconImg.src = ICON_SRC;
      if (data.error) return;
      this.lastResult = data.output;
      navigator.clipboard.writeText(data.output);
    });
  }

  /* adjustContainerPos(e, initPos, initMouse) {
    // X-axis adjustment
    if (this.containerXOrient === 'right' && this.container.getBoundingClientRect().right > window.innerWidth) {
      this.container.style.right = '-36px';
      this.container.style.left = 'auto';
      this.container.querySelector('.strompt-helper-header').style.flexDirection = 'row-reverse';
      this.containerXOrient = 'left';
    } else if (this.containerXOrient === 'left' && this.container.getBoundingClientRect().right + this.container.scrollWidth - 36 < window.innerWidth) {
      this.container.style.right = 'auto';
      this.container.style.left = '0px';
      this.container.querySelector('.strompt-helper-header').style.flexDirection = 'row';
      this.containerXOrient = 'right';
    }

    if (this.container.style.right === '-36px') {
      const newPos = window.innerWidth - ((-initMouse.x + initPos.x - 8) + e.clientX);
      if (newPos < 36) return;
      this.container.parentElement.style.right = `${newPos}px`;
      this.container.parentElement.style.left = 'auto';
    } else {
      const newPos = initPos.x - 8 - initMouse.x + e.clientX;
      if (newPos < 0) return;
      this.container.parentElement.style.left = `${newPos}px`;
      this.container.parentElement.style.right = 'auto';
    }

    // Y-axis adjustment
    const innerContent = this.container.querySelector('.strompt-expandable-wrapper-innercontent');
    if (this.containerYOrient === 'down' && this.container.getBoundingClientRect().bottom > window.innerHeight) {
      this.container.style.bottom = '-42px';
      this.container.style.top = '';
      this.container.style.flexDirection = 'column-reverse';
      this.containerYOrient = 'up';
    } else if (
      this.containerYOrient === 'up' &&
      (this.container.getBoundingClientRect().bottom - innerContent.scrollHeight - 42 < 0 ||
        this.container.getBoundingClientRect().bottom + innerContent.scrollHeight + 8 < window.innerHeight)
    ) {
      this.container.style.bottom = '';
      this.container.style.top = '0px';
      this.container.style.flexDirection = 'column';
      this.containerYOrient = 'down';
    }

    if (this.container.style.bottom === '-42px') {
      const newPos = window.innerHeight - (initPos.y - 8 - initMouse.y + e.clientY);
      if (newPos < 42) return;
      this.container.parentElement.style.bottom = `${newPos}px`;
      this.container.parentElement.style.top = 'auto';
    } else {
      const newPos = initPos.y - 8 - initMouse.y + e.clientY;
      if (newPos < 0) return;
      this.container.parentElement.style.top = `${newPos}px`;
      this.container.parentElement.style.bottom = 'auto';
    }
  } */

  async createHelperComponent() {
    const shadowContainer = document.createElement('div');
    shadowContainer.id = 'strompt-helper';
    document.body.appendChild(shadowContainer);
  
    const shadow = shadowContainer.attachShadow({ mode: 'open' });
    const outerContainer = document.createElement('div');
    outerContainer.classList.add('strompt-helper-position-container');
  
    const stromptResultsWindow = document.createElement('div');
    stromptResultsWindow.classList.add('strompt-results-window');
  
    const resultsHeader = document.createElement('div');
    resultsHeader.classList.add('strompt-results-header');
  
    const logoImg = document.createElement('img');
    logoImg.src = ICON_SRC;
    logoImg.classList.add('strompt-logo');
    logoImg.alt = 'Strompt Logo';
  
    const headerButtons = document.createElement('div');
    headerButtons.classList.add('strompt-header-buttons');

    const optionsButtonWrapper = document.createElement('div');
    optionsButtonWrapper.classList.add('strompt-options-button-wrapper');
  
    const optionsButton = document.createElement('button');
    optionsButton.classList.add('strompt-options-button');
    optionsButton.innerHTML = '<i class="fas fa-cog"></i>';

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('strompt-options-container');
    optionsButtonWrapper.appendChild(optionsButton)
    optionsButtonWrapper.appendChild(optionsContainer)

    optionsButton.addEventListener('click', () => {
      if (optionsContainer.style.display === 'flex') optionsContainer.style.display = 'none'
      else optionsContainer.style.display = 'flex'
    })
  
    const closeButton = document.createElement('button');
    closeButton.classList.add('strompt-close-button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.addEventListener('click', () => {
      stromptResultsWindow.style.display = 'none';
    });
  
    headerButtons.appendChild(optionsButtonWrapper);
    headerButtons.appendChild(closeButton);
    resultsHeader.appendChild(logoImg);
    resultsHeader.appendChild(headerButtons);
  
    const resultsContent = document.createElement('div');
    resultsContent.classList.add('strompt-results-content');
  
    //const { customInput: textareaInput, inputState: textareaInputState } = this.createCustomInput('Enter your text here...');
    //textareaInput.classList.add('strompt-textarea');
    //resultsContent.appendChild(textareaInput);
  
    //const { customInput: promptInput, inputState: promptInputState } = this.createCustomInput('Quick prompt...');
    //promptInput.classList.add('strompt-prompt-input');
    //resultsContent.appendChild(promptInput);
  
    stromptResultsWindow.appendChild(resultsHeader);
    stromptResultsWindow.appendChild(resultsContent);
    shadow.appendChild(stromptResultsWindow);
  
    const container = document.createElement('div');
    container.classList.add('strompt-helper-container');
    outerContainer.appendChild(container);
  
    const style = document.createElement('style');
    style.textContent = this.getStyles();
    shadow.appendChild(style);
    shadow.appendChild(outerContainer);
  
    const googleFont = document.createElement('link');
    googleFont.rel = 'stylesheet';
    googleFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(googleFont);
  
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
  
    const header = document.createElement('div');
    header.classList.add('strompt-helper-header');
  
    const iconImg = document.createElement('img');
    iconImg.src = ICON_SRC;
    iconImg.classList.add('strompt-icon');
    iconImg.alt = 'Helper Icon';
  
    const promptWrapper = document.createElement('div');
    promptWrapper.classList.add('strompt-recommendations-wrapper');
    const promptInner = document.createElement('div');
    promptInner.classList.add('strompt-prompt-inner');
  
    const input = document.createElement('input')
    input.classList.add('strompt-input')
    input.placeholder = 'Quick prompt...'
    promptInner.appendChild(input);
    promptWrapper.appendChild(promptInner)
  
    header.appendChild(iconImg);
    header.appendChild(promptWrapper);
  
    const expandableWrapperCols = document.createElement('div');
    expandableWrapperCols.classList.add('strompt-expandable-wrapper-cols');
  
    const expandableWrapperRows = document.createElement('div');
    expandableWrapperRows.classList.add('strompt-expandable-wrapper-rows');
  
    const innerContent = document.createElement('div');
    innerContent.classList.add('strompt-expandable-wrapper-innercontent');
  
    //const { customInput, inputState } = this.createCustomInput();
    //innerContent.appendChild(customInput);
  
    const menu = document.createElement('div');
    menu.classList.add('strompt-menu-items');
    innerContent.appendChild(menu);
  
    expandableWrapperRows.appendChild(innerContent);
    expandableWrapperCols.appendChild(expandableWrapperRows);
    container.appendChild(header);
    container.appendChild(expandableWrapperCols);
  
    /* let initPos, initMouse;
    let mouseMoveHandler;
    iconImg.addEventListener('mousedown', (e) => {
      e.preventDefault();
      initPos = iconImg.getBoundingClientRect();
      initMouse = { x: e.clientX, y: e.clientY };
      mouseMoveHandler = (e) => this.adjustContainerPos(e, initPos, initMouse);
      window.addEventListener('mousemove', mouseMoveHandler);
    });
  
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    }); */
  
    /* [inputState, headerPromptInputState, textareaInputState, promptInputState].forEach((state) => {
      state.customInput.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.activateCustomInput(state);
        if (state.textContent === '') {
          state.cursorPos = 0;
        } else {
          const clickX = e.offsetX;
          let estimatedPos = 0;
          const avgCharWidth = parseFloat(getComputedStyle(state.customInput).fontSize) * 0.6;
          let currentWidth = 0;
          for (let i = 0; i < state.textContent.length; i++) {
            if (clickX < currentWidth + avgCharWidth / 2) break;
            currentWidth += avgCharWidth;
            estimatedPos++;
          }
          state.cursorPos = Math.max(0, Math.min(estimatedPos, state.textContent.length));
        }
        this.updateCustomInputDisplay(state);
      });
    }); */
  
    return { promptWrapper, shadowContainer, container, iconImg, updateMenuDisplay: () => this.updateMenuDisplay(), menu, stromptResultsWindow };
  }

  updateMenuDisplay() {
    const text = window.getSelection().toString().trim();
    const header = this.container.querySelector('.strompt-helper-header');
    const expandableWrapperCols = this.container.querySelector('.strompt-expandable-wrapper-cols');
    const expandableWrapperRows = this.container.querySelector('.strompt-expandable-wrapper-rows');
    const innerContent = this.container.querySelector('.strompt-expandable-wrapper-innercontent');

    // Adjust X orientation
    if (this.containerXOrient === 'right' && this.container.getBoundingClientRect().right > window.innerWidth) {
      this.container.style.right = '-36px';
      this.container.style.left = 'auto';
      header.style.flexDirection = 'row-reverse';
      this.containerXOrient = 'left';
    } else if (this.containerXOrient === 'left' && this.container.getBoundingClientRect().right + this.container.scrollWidth - 36 < window.innerWidth) {
      this.container.style.right = 'auto';
      this.container.style.left = '0px';
      header.style.flexDirection = 'row';
      this.containerXOrient = 'right';
    }

    // Adjust Y orientation
    if (this.containerYOrient === 'down' && this.container.getBoundingClientRect().bottom > window.innerHeight) {
      this.container.style.bottom = '-42px';
      this.container.style.top = '';
      this.container.style.flexDirection = 'column-reverse';
      this.containerYOrient = 'up';
    } else if (
      this.containerYOrient === 'up' &&
      (this.container.getBoundingClientRect().bottom - innerContent.scrollHeight - 42 < 0 ||
        this.container.getBoundingClientRect().bottom + innerContent.scrollHeight + 8 < window.innerHeight)
    ) {
      this.container.style.bottom = '';
      this.container.style.top = '0px';
      this.container.style.flexDirection = 'column';
      this.containerYOrient = 'down';
    }

    // Update expansion states
    if (this.isOpen) {
      /* if (this.iconImg.src === DONE_ICON_SRC) this.iconImg.src = ICON_SRC */
      this.promptWrapper.classList.add('expanded');
      if (text) {
        /* promptWrapper.classList.remove('expanded'); */
        expandableWrapperCols.classList.add('expanded');
        expandableWrapperRows.classList.add('expanded');
      } else {
        expandableWrapperCols.classList.remove('expanded');
        expandableWrapperRows.classList.remove('expanded');
      }
    } else {
      this.promptWrapper.classList.remove('expanded');
      expandableWrapperCols.classList.remove('expanded');
      expandableWrapperRows.classList.remove('expanded');
    }

    // Update dropdowns
    expandableWrapperRows.querySelectorAll('.strompt-menu-item-container').forEach((itemContainer, idx) => {
      const dropdownItems = itemContainer.querySelector('.strompt-dropdown-items');
      const chevronIcon = itemContainer.querySelector('.strompt-chevron-icon');
      if (dropdownItems && chevronIcon) {
        if (this.dropdownIndex === idx) {
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

  /* updateResultsWindow() {
    this.resultsWindow.querySelectorAll('.post-action-options').forEach(option => {option.remove()})
    const optionsContainer = this.resultsWindow.querySelector('.strompt-options-container')
    POST_ACTIONS[this.lastAction].forEach(action => {
      const span = document.createElement('span')
      span.classList.add('post-action-options')
      span.innerText = action
      span.addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'mutate', input: this.lastSentText, result: this.lastResult, action })
      })
      optionsContainer.appendChild(span)
    })
  } */

  setupEventListeners() {
    this.container.addEventListener('mouseenter', () => {
      this.isOpen = true;
      this.updateMenuDisplay();
    });

    let isSelecting = false;
    document.addEventListener('keydown', (e) => {
      if (
        (e.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) ||
        (e.shiftKey && e.ctrlKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) ||
        (e.shiftKey && e.altKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'A')
      ) {
        isSelecting = true;
      }
    });

    /* const handleTextSelectionBackendCall = (text) => {
      this.lastSentText = text
      chrome.runtime.sendMessage({ type: "TEXT_SELECTED", text }, data => {
        if (data.error) {
          this.iconImg.src = ICON_SRC
          return;
        }
        const buttons = this.recommendationsWrapper.children[0].querySelectorAll("button");
        buttons.forEach(button => button.remove());
        if (data.output.toLowerCase() === 'no') {
          this.iconImg.src = ICON_SRC
        } else {
          const resArr = data.output.split(',').map(s => s.trim())
          resArr.forEach(elem => {
            const recommendationsButton = document.createElement('button');
            recommendationsButton.addEventListener('click', () => {
              const text = window.getSelection().toString().trim();
              if (!text) return;
              this.isOpen = false;
              this.iconImg.src = LOADING_ICON_SRC;
              this.updateMenuDisplay();

              chrome.runtime.sendMessage({ type: 'getAiResponse', text, custom: true, prompt: elem }, (data) => {
                this.iconImg.src = ICON_SRC;
                if (data.error) return;
                this.lastResult = data.output;
                navigator.clipboard.writeText(data.output);
              });
              this.updateResultsWindow()
            })
            recommendationsButton.classList.add('strompt-recommendations');
            recommendationsButton.textContent = `${elem}`;
            this.recommendationsWrapper.children[0].appendChild(recommendationsButton);
          })
          this.iconImg.src = DONE_ICON_SRC
        }
      })
    } */

    document.addEventListener('keyup', (e) => {
      if (!isSelecting) return;
      setTimeout(() => {
        if (e.shiftKey || e.ctrlKey || e.altKey) return;
        if (['Shift', 'Control', 'Alt'].includes(e.key)) {
          isSelecting = false;
          const text = window.getSelection().toString().trim();
          if (!text) return;
          this.container.style.display = 'flex';
          /* this.iconImg.src = LOADING_ICON_SRC
          handleTextSelectionBackendCall(text) */
        }
      }, 0);
    });

    let target = null
    document.addEventListener('mousedown', (e) => {
      target = e.target
    })

    document.addEventListener('mouseup', (e) => {
      setTimeout(() => {
        if (target === this.shadowContainer) return
        if (this.container.style.display === 'none') this.isOpen = false;
        this.dropdownIndex = null;
        this.updateMenuDisplay()
        this.container.style.left = e.pageX + 10 + 'px'
        this.container.style.top = e.pageY + 10 + 'px'
        if (target && (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)) {
          this.container.style.display = 'flex';
        } else {
          this.container.style.display = 'none';
        }
        const text = window.getSelection().toString().trim();
        if (!text) return;
        this.selectedText = text;
        /* if (text === this.lastSentText) return */
        this.container.style.display = 'flex';
        /* this.iconImg.src = LOADING_ICON_SRC
        handleTextSelectionBackendCall(text) */
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

  /* 
  #1b3685
  #3067e2
  #3656ab
  #4580f8
  */

  getStyles() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
      button { cursor: pointer; }
      .strompt-helper-position-container {
        top: 0px; left: 0px; position: fixed; z-index: 2147483647;
      }
      .strompt-helper-container {
        position: absolute; font-family: 'Inter', sans-serif; color: #4b5563;
        border-radius: 15px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        min-width: max-content; padding: 4px; border: 1px solid #e5e7eb; z-index: 99999;
        background-color: #ffffff; flex-direction: column; align-items: flex-start; display: none; color: black;
      }
      .strompt-helper-header { display: flex; align-items: center; width: 100%; }
      .strompt-icon { height: 20px; width: 20px; }
      .strompt-recommendations-wrapper {
        display: grid; grid-template-columns: 0fr; overflow: hidden; transition: grid-template-columns 100ms ease;
        width: 100%;
      }
      .strompt-recommendations-wrapper.expanded { grid-template-columns: 1fr; padding: 1px; }
      .strompt-recommendations-inner { min-width: 0; display: flex; }
      .strompt-recommendations {
        margin-left: 8px; background-color: #f3f4f6; border-radius: 12px; padding: 4px 8px;
        font-size: 14px; outline: none; border: none; white-space: nowrap; color: black;
      }
      .strompt-recommendations:hover { background-color: #d1d5db; }
      .strompt-expandable-wrapper-cols {
        display: grid; grid-template-columns: 0fr; margin-top: 0; overflow: hidden;
        transition: grid-template-columns 100ms ease, margin-top 100ms ease; width: 100%; bottom: 50px;
      }
      .strompt-expandable-wrapper-cols.expanded { grid-template-columns: 1fr; margin-top: 8px; }
      .strompt-expandable-wrapper-rows {
        display: grid; grid-template-rows: 0fr; overflow: hidden; transition: grid-template-rows 100ms ease;
      }
      .strompt-expandable-wrapper-rows.expanded { grid-template-rows: 1fr; }
      .strompt-expandable-wrapper-innercontent { min-height: 0; }
      .strompt-expandable-wrapper-innercontent > * { margin-bottom: 4px; }
      .strompt-expandable-wrapper-innercontent > *:last-child { margin-bottom: 0; }
      .strompt-quick-prompt-input {
        border: 1px solid #d1d5db; border-radius: 8px; padding: 4px 8px; margin: 4px;
        margin-bottom: 8px; outline: 1px solid transparent; font-size: 14px;
      }
      .strompt-menu-item-container {}
      .strompt-menu-item-button {
        padding: 4px 8px; width: 100%; font-size: 14px; display: flex; color: black; white-space: nowrap;
        align-items: center; justify-content: space-between; background: #ffffff; border: none; outline: none;
      }
      .strompt-chevron-icon {
        display: inline-block; margin-left: 4px; font-size: 10px; vertical-align: middle; transition: transform 0.1s ease-in-out;
      }
      .strompt-menu-item-button .strompt-chevron-icon.fa-chevron-down, .strompt-menu-item-button .strompt-chevron-icon.fa-chevron-right {
        transform: rotate(0deg);
      }
      .strompt-dropdown-items {
        overflow: hidden; transition: grid-template-rows 100ms ease; display: grid; grid-template-rows: 0fr;
      }
      .strompt-dropdown-items.expanded { grid-template-rows: 1fr; }
      .strompt-dropdown-items-inner { min-height: 0; gap: 0.5rem; }
      .strompt-dropdown-item-button, .strompt-dropdown-item-button-layer1 {
        text-align: left; display: block; box-sizing: border-boxsonic: 14px; border-radius: 8px;
        padding: 4px 8px; border: none; outline: none; margin: 4px; background: white; color: black;
      }
      .strompt-dropdown-item-button { margin-left: 16px; width: calc(100% - 20px); }
      .strompt-dropdown-item-button-layer1 { margin-left: 0px; width: 100%; }
      .strompt-dropdown-item-button:hover, .strompt-dropdown-item-button-layer1:hover { background-color: #d1d5db; }
      .strompt-dropdown-container { display: flex; justify-content: space-between; }
      .strompt-turn-icon { font-size: 10px; transform: rotate(90deg); }
      .strompt-prompt-inner { min-width: 0;}
      .strompt-input {
        background: white; color: black; border: 1px solid black; outline: 1px solid transparent; border-radius: 5px; padding: 2px; width: 100%;
        box-sizing: border-box;
      }
      .strompt-input:focus {
        border: 1px solid black; outline: 1px solid black;
      }
    
      .strompt-results-window {
        position: fixed; z-index: 99999999; background: #ffffff; width: 400px; height: 500px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        left: 50%; top: 50%; transform: translate(-50%, -50%); border: 1px solid #e5e7eb; border-radius: 8px;
        font-family: 'Inter', sans-serif; color: #4b5563; display: flex; flex-direction: column; display: none;
      }
      .strompt-results-header {
        display: flex; align-items: center; justify-content: space-between; padding: 8px 12px;
        border-bottom: 1px solid #e5e7eb; background: #f9fafb;
      }
      .strompt-logo { height: 25px; width: 25px; }
      .strompt-header-buttons { display: flex; gap: 8px; }
      .strompt-options-button, .strompt-close-button {
        background: none; border: none; outline: none; padding: 4px; font-size: 16px; color: #4b5563;
        border-radius: 4px; display: flex; align-items: center; justify-content: center;
      }
      .strompt-options-button:hover, .strompt-close-button:hover { background: #d1d5db; }
      .strompt-results-content {
        flex: 1; display: flex; flex-direction: column; padding: 12px; gap: 8px; overflow-y: auto;
      }
      .strompt-textarea {
        flex: 1; min-height: 100px; resize: none; padding: 8px; font-size: 14px;
        border: 1px solid #d1d5db; border-radius: 8px; outline: 1px solid transparent;
        line-height: 1.5; margin: 0; white-space: normal; max-width: 100%;
      }
      .strompt-textarea.fake-focus { outline-color: #d1d5db; }
      .strompt-prompt-input {
        min-height: 20px; padding: 4px 8px; font-size: 14px; border: 1px solid #d1d5db;
        border-radius: 8px; outline: 1px solid transparent; margin: 0; line-height: 1.5;
      }
      .strompt-prompt-input.fake-focus { outline-color: #d1d5db; }
      .strompt-options-button-wrapper {
        position: relative
      }
      .strompt-options-container {
        flex-direction: column; position: absolute; right: 0; background: #ffffff; white-space: nowrap; z-index: 999999; display: none;
      }
    `;
  }
}
