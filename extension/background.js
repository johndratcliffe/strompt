//import CONFIG from "./config.js";

const buildContextMenus = async (recommendations) => {
  chrome.contextMenus.removeAll();

  // Strompt
  chrome.contextMenus.create({
    id: "strompt",
    title: "Strompt",
    contexts: ["selection"]
  });

  if (recommendations && recommendations.toLowerCase() !== 'no') {
    const actions = recommendations.split(',').map(a => a.trim());
    for (const action of actions) {
      chrome.contextMenus.create({
        id: `ai-${action}`,
        title: `AI Recommends: ${action}`,
        parentId: "strompt",
        contexts: ["selection"]
      });
    }
  }

  const { contextMenuSettings } = await chrome.storage.sync.get('contextMenuSettings');

  if (!contextMenuSettings) {
    // Text Assistant ----------------------------
    chrome.contextMenus.create({
      id: "text-assistant",
      parentId: "strompt",
      title: "Text Assistant",
      contexts: ["selection"]
    });
      chrome.contextMenus.create({
        id: "translate",
        parentId: "text-assistant",
        title: "Translate Text",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "summarize",
        parentId: "text-assistant",
        title: "Summarize Text",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "tone",
        parentId: "text-assistant",
        title: "Change Tone",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "notes",
        parentId: "text-assistant",
        title: "Create Notes",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "rewrite",
        parentId: "text-assistant",
        title: "Rewrite Word Limit",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "reply",
        parentId: "text-assistant",
        title: "Reply",
        contexts: ["selection"]
      });
    // Code Transformer ----------------------------
    chrome.contextMenus.create({
      id: "code-transformer",
      parentId: "strompt",
      title: "Code Transformer",
      contexts: ["selection"]
    });
      chrome.contextMenus.create({
        id: "refactor",
        parentId: "code-transformer",
        title: "Refactor",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "comments",
        parentId: "code-transformer",
        title: "Add Comments",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "test-cases",
        parentId: "code-transformer",
        title: "Test Cases",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "minify",
        parentId: "code-transformer",
        title: "Minify",
        contexts: ["selection"]
      });
    // Marketing/Sales ---------------------------------
    chrome.contextMenus.create({
      id: "marketing-sales",
      parentId: "strompt",
      title: "Marketing/Sales",
      contexts: ["selection"]
    });
      chrome.contextMenus.create({
        id: "customer-reply",
        parentId: "marketing-sales",
        title: "Reply to Customer",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "outreach",
        parentId: "marketing-sales",
        title: "Outreach Email",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "product-description",
        parentId: "marketing-sales",
        title: "Product Description",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "seo-optimization",
        parentId: "marketing-sales",
        title: "SEO Optimization",
        contexts: ["selection"]
      });
    // Academic -----------------------------
    chrome.contextMenus.create({
      id: "academic",
      parentId: "strompt",
      title: "Academic",
      contexts: ["selection"]
    });
      chrome.contextMenus.create({
        id: "cite",
        parentId: "academic",
        title: "Cite",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "laymans",
        parentId: "academic",
        title: "Layman's Terms",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "key-points",
        parentId: "academic",
        title: "Extract Key Points",
        contexts: ["selection"]
      });
      chrome.contextMenus.create({
        id: "chart-table",
        parentId: "academic",
        title: "Create Chart/Table",
        contexts: ["selection"]
      });
    return;
  }

  contextMenuSettings.forEach(element => {
    const id = element.prompt ? `custom-${element.prompt}` : element.label
    chrome.contextMenus.create({
      id,
      title: element.label,
      parentId: 'strompt',
      contexts: ["selection"]
    });
    if (element.id.startsWith('item-')) return
    element.items.forEach(child => {
      chrome.contextMenus.create({
        id: child.prompt ? `custom-${child.prompt}` : child.label,
        title: child.label,
        parentId: id,
        contexts: ["selection"]
      });
    })
  });
}

chrome.runtime.onInstalled.addListener(() => {
  buildContextMenus()
})

chrome.runtime.onStartup.addListener(async () => {
  try {
    const networkResponse = await fetch('http://localhost:5000/api/auth/user')
    const dbUser = await networkResponse.json()
    const name = dbUser.name
    const plan = dbUser.subscription.plan
    chrome.storage.sync.get('user', localUser => {
      if (localUser.user.plan !== dbUser.subscription.plan) {
        chrome.storage.sync.set({ user: { name, plan } })
        if (plan === 'free') {
          chrome.storage.sync.remove('contextMenuSettings')
          chrome.storage.sync.remove('smartPasteOptions')
          chrome.storage.sync.remove('customActions')
        } else if (plan === 'basic') {
          chrome.storage.sync.remove('smartPasteOptions')
          chrome.storage.sync.get(['contextMenuSettings', 'customActions'], (result) => {
            chrome.storage.sync.set({ contextMenuSettings: 
              result.contextMenuSettings
              .filter(current => result.customActions.every(action => current.id !== action.id))
              .map(current => current.id.startsWith('item-') ? current : {...current, items: current.items.filter(item => result.customActions.every(action => item.id !== action.id))}) 
            });
            chrome.storage.sync.remove('customActions')
          });
        }
      }
    })
  }
  catch {err => console.error(err)}
})


chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.contextMenuSettings) {
    buildContextMenus()
  }
})

const aiResponse = async ({ input, prompt, action, custom, smartPasteOptions, reprompt, result }) => {
  const userName = (await chrome.storage.sync.get('user')).user?.name
  return fetch('http://localhost:5000/api/callAI'/* CONFIG.API_KEY */, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input, prompt, action, model: 'llama-3.3-70b-versatile', custom, smartPasteOptions, userName })
  })
}

// ------- CONTEXT MENU -------
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  let prompt = info.menuItemId
  let custom = false
  if (prompt.startsWith('custom-')) {
    prompt = prompt.split('-')[1]
    custom = true
  } else if (prompt.startsWith('ai-')) prompt = prompt.split('-')[1]
  else if (prompt.startsWith('container-')) return
  const action = 'response'
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      input = window.getSelection().toString();
      if (!input) return
      document.body.style.cursor = 'wait'
      return input
    }
  }, results => {
    if (results[0].result) {
      aiResponse({ action, input: results[0].result, prompt, custom })
        .then(res => res.json())
        .then(data => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (response) => {
              navigator.clipboard.writeText(response)
            },
            args: [data.output || data.error],
          })
        })
        .catch(err => {
          console.error("Error talking to Groq function:", err);
        })
        .finally(() => {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.body.style.cursor = 'default'
          })
        })
    }
  })
})

// ------- KEYBIND -------
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "trigger-groq") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const action = 'keybind'
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        input = window.getSelection().toString();
        if (!input) return
        document.body.style.cursor = 'wait'
        return input
      }
    }, async (results) => {
      if (results[0].result) {
        const smartPasteOptions = (await chrome.storage.sync.get('smartPasteOptions')).smartPasteOptions
        aiResponse({ action, input: results[0].result, smartPasteOptions })
          .then(res => res.json())
          .then(data => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (response) => {
                navigator.clipboard.writeText(response)
              },
              args: [data.output || data.error]
            })
          })
          .catch(err => {
            console.error("Error talking to Groq function:", err);
          })
          .finally(() => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: () => document.body.style.cursor = 'default'
            })
          })
      }
    })
  }
});

// ------- AI RECOMMENDATION -------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TEXT_SELECTED") {
    chrome.action.setIcon({ path: '/loading-icon_32.png' });

    const input = message.text;
    const action = 'recommend';
    const context = 'extension';
    let iconWasSet = false;

    aiResponse({ input, context, action })
      .then(res => res.json())
      .then(data => {
        sendResponse(data)
        if (data.error) {
          chrome.action.setIcon({ path: '/icon_32.png' });
          return;
        }

        iconWasSet = true;
        if (data.output === 'no') {
          chrome.action.setIcon({ path: '/icon_32.png' });
        } else {
          chrome.action.setIcon({ path: '/icon-done_32.png' });
        }
        buildContextMenus(data.output);
      })
      .catch(err => {
        sendResponse(err)
        console.error("Error talking to Groq function:", err);
      })
      .finally(() => {
        if (!iconWasSet) {
          chrome.action.setIcon({ path: '/icon_32.png' });
        }
      });
    return true; // Keeps the message port open until the async operation completes
  }

  if (message.type === "getAuthToken") {
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (chrome.runtime.lastError) {
        console.error("Error getting auth token:", chrome.runtime.lastError);
        sendResponse({ error: "Failed to get token" });
        return;
      }

      sendResponse({ token });
    });

    return true; // Keeps the message port open until the async operation completes
  }

  if (message.type === "getAiResponse") {
    const action = 'response'
    aiResponse({ input: message.text, action, prompt: message.prompt || message.label, custom: message.prompt ? true : false })
      .then(res => res.json())
      .then(data => {sendResponse(data)})
      .catch(err => {sendResponse(err)})

    return true;
  }

  if (message.type === "getAiRecommendation") {
    const action = 'recommend'
    aiResponse({ input: message.text, action })
      .then(res => res.json())
      .then(data => {sendResponse(data)})
      .catch(err => {sendResponse(err)})

    return true;
  }

  if (message.type === "generate") {
    const action = 'generate'
    aiResponse({ input: message.text, action, prompt: message.prompt, custom: true })
      .then(res => res.json())
      .then(data => {sendResponse(data)})
      .catch(err => {sendResponse(err)})

    return true;
  }

  if (message.type === "mutate") {
    const action = 'mutate'
    aiResponse({ input: message.input, action, prompt: message.prompt, result: message.result, reprompt: message.action })
      .then(res => res.json())
      .then(data => {sendResponse(data)})
      .catch(err => {sendResponse(err)})

    return true;
  }
});

