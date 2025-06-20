document.addEventListener('DOMContentLoaded', async function () {
  // Plan details
  const planDetails = {
    free: {
      name: 'Free Plan',
      badgeClass: 'plan-free',
      features: [
        'Text Assistant',
        'Code Assistant',
        'Academic Assistant',
        'Marketing/Social',
        '5 Actions / Day',
        'Community Forum'
      ],
      actions: [
        {
          text: 'Upgrade to Basic',
          action: 'upgrade-basic',
          variant: 'primary'
        },
        {
          text: 'Go Pro',
          action: 'upgrade-pro',
          variant: 'primary'
        }
      ]
    },
    basic: {
      name: 'Basic Plan',
      badgeClass: 'plan-basic',
      features: [
        'All Free features',
        'Smart Paste',
        'Context menu customization',
        '15 Actions / Day',
        'Email Support'
      ],
      actions: [
        {
          text: 'Manage Subscription',
          action: 'manage-subscription',
          variant: 'secondary'
        },
        {
          text: 'Go Pro',
          action: 'upgrade-pro',
          variant: 'primary'
        }
      ]
    },
    pro: {
      name: 'Pro Plan',
      badgeClass: 'plan-pro',
      features: [
        'All Basic features',
        'Custom AI prompts',
        'Smart Paste Customization',
        'Unlimited actions',
        'Priority email support'
      ],
      actions: [
        {
          text: 'Manage Subscription',
          action: 'manage-subscription',
          variant: 'secondary'
        }
      ]
    }
  };

  // Initialize UI based on user data
  function initializeUI(user) {
    if (!user) document.getElementById('sign-out').textContent = 'Sign In'
    // Set username
    document.getElementById('username').textContent = user?.name || 'Guest';
    
    // Set plan badge
    const planBadge = document.getElementById('plan-badge');
    const currentPlan = planDetails[user?.plan || 'free'];
    planBadge.textContent = currentPlan.name;
    planBadge.className = `plan-badge ${currentPlan.badgeClass}`;
    
    // Populate features
    const featuresContainer = document.getElementById('plan-features');
    featuresContainer.innerHTML = '';
    currentPlan.features.forEach(feature => {
      const li = document.createElement('li');
      li.className = 'flex items-start';
      li.innerHTML = `
        <svg class="w-4 h-4 text-green-500 mr-1.5 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        ${feature}
      `;
      featuresContainer.appendChild(li);
    });
    
    // Populate actions
    const actionsContainer = document.getElementById('plan-actions');
    actionsContainer.innerHTML = '';
    currentPlan.actions.forEach(action => {
      const button = document.createElement('button');
      button.className = action.variant === 'primary' 
        ? 'w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm'
        : 'w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm';
      button.textContent = action.text;
      button.dataset.action = action.action;
      actionsContainer.appendChild(button);
    });
    
    // Show contextmenu customization option for Basic and Pro plans
    if (user?.plan === 'basic' || user?.plan === 'pro') {
      document.getElementById('customize-menu').classList.remove('hidden');
      document.getElementById('smart-paste-option').classList.remove('hidden');
      document.getElementById('smart-paste-status-circle').classList.add('bg-green-500');
      document.getElementById('smart-paste-status-text').textContent = 'SmartPaste is active';
    } else {
      document.getElementById('settings').classList.add('hidden');
      document.getElementById('smart-paste-option').classList.add('hidden');
      document.getElementById('smart-paste-status-circle').classList.add('bg-red-500');
      document.getElementById('smart-paste-status-text').textContent = 'SmartPaste is inactive';
    }
  }

  // Initialize event listeners
  function initializeEventListeners(user) {
    // Sign out button
    document.getElementById('sign-out').addEventListener('click', function() {
      window.open('https://www.strompt.com/profile', '_blank');
    });
    
    // Customize menu button
    document.getElementById('customize-menu').addEventListener('click', function() {
      if (user?.plan === 'basic' || user?.plan === 'pro') {
        openContextMenuSettings();
      } else {
        alert('Upgrade to Basic or Pro to customize your context menu');
      }
    });

    // Smart paste customize button (Pro only)
    const customizeSmartPasteBtn = document.getElementById('customize-smart-paste');
    if (customizeSmartPasteBtn) {
      customizeSmartPasteBtn.addEventListener('click', function() {
        if (user?.plan === 'pro') {
          openSmartPasteSettings();
        } else {
          alert('Upgrade to Pro to customize Smart Paste');
        }
      });
    }
    
    // Plan action buttons
    document.getElementById('plan-actions').addEventListener('click', function(e) {
      if (e.target.dataset.action) {
        handlePlanAction(e.target.dataset.action);
      }
    });
  }

  // Open context menu settings
  function openContextMenuSettings() {
    window.open('https://www.strompt.com/contextmenu', '_blank');
  }

  // Toggle Smart Paste functionality
  function openSmartPasteSettings() {
    window.open('https://www.strompt.com/smartpaste', '_blank');
  }

  // Handle plan-related actions
  function handlePlanAction(action) {
    switch(action) {
      case 'upgrade-basic':
        window.open('https://www.strompt.com/pricing', '_blank');
        break;
      case 'upgrade-pro':
        if (user?.plan === 'basic') window.open('https://www.strompt.com/profile', '_blank');
        else window.open('https://www.strompt.com/pricing', '_blank');
        break;
      case 'manage-subscription':
        window.open('https://www.strompt.com/profile', '_blank');
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  async function loadSettings (user) {
    initializeUI(user)
  }

  const user = (await chrome.storage.sync.get('user')).user
  initializeEventListeners(user)
  loadSettings(user)
});