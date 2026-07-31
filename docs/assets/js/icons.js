/*
 * Arch Flows Designer - vector icon library.
 * Each icon is a self-contained, Azure-styled tile (colored rounded square with a
 * white symbol) rendered as inline SVG so it works offline and inside the strict
 * MkDocs build without any external icon requests.
 */
window.ArchIcons = (function () {
  const ICONS = {
    // Compute
    appservice: { c: "#0078D4", s: `<circle cx="16" cy="16" r="8" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M8 16h16M16 8c3 2.5 3 13.5 0 16M16 8c-3 2.5-3 13.5 0 16" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    functions: { c: "#0062B1", s: `<path d="M18 7l-7 10h4l-2 8 8-11h-4z" fill="#fff"/>` },
    aks: { c: "#0078D4", s: `<path d="M16 7l6.9 3.5v7L16 21l-6.9-3.5v-7z" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="16" cy="14" r="2.2" fill="#fff"/><path d="M16 16.2v3.5M12.5 12.2l-1.8-1M19.5 12.2l1.8-1" stroke="#fff" stroke-width="1.2"/>` },
    containerapps: { c: "#0078D4", s: `<rect x="9" y="9" width="7" height="7" rx="1" fill="#fff"/><rect x="17" y="9" width="6" height="7" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/><rect x="12" y="17" width="8" height="6" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/>` },
    vm: { c: "#0062B1", s: `<rect x="8" y="9" width="16" height="11" rx="1.5" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M13 23h6M16 20v3" stroke="#fff" stroke-width="1.6"/>` },
    vmss: { c: "#0062B1", s: `<rect x="7" y="8" width="12" height="8" rx="1.5" fill="none" stroke="#fff" stroke-width="1.4"/><rect x="13" y="14" width="12" height="8" rx="1.5" fill="#0062B1" stroke="#fff" stroke-width="1.6"/>` },

    // Networking
    vnet: { c: "#1B4FA0", s: `<circle cx="9" cy="10" r="2.2" fill="#fff"/><circle cx="23" cy="10" r="2.2" fill="#fff"/><circle cx="16" cy="22" r="2.2" fill="#fff"/><path d="M9 10h14M9 10l7 12M23 10l-7 12" stroke="#fff" stroke-width="1.3" fill="none"/>` },
    loadbalancer: { c: "#1B4FA0", s: `<circle cx="16" cy="10" r="2" fill="#fff"/><circle cx="9" cy="22" r="2" fill="#fff"/><circle cx="16" cy="22" r="2" fill="#fff"/><circle cx="23" cy="22" r="2" fill="#fff"/><path d="M16 12v3M9 20v-2h14v2M16 15v5" stroke="#fff" stroke-width="1.3" fill="none"/>` },
    appgateway: { c: "#1B4FA0", s: `<rect x="10" y="9" width="12" height="14" rx="1.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M13 16h8M18 13l3 3-3 3" stroke="#fff" stroke-width="1.4" fill="none"/>` },
    frontdoor: { c: "#1B4FA0", s: `<path d="M11 22V11l5-3 5 3v11" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M16 22v-6" stroke="#fff" stroke-width="1.5"/><circle cx="16" cy="14" r="1.2" fill="#fff"/>` },
    firewall: { c: "#B5560E", s: `<rect x="8" y="9" width="16" height="14" rx="1" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M8 14h16M8 19h16M16 9v5M12 14v5M20 14v5M16 19v4" stroke="#fff" stroke-width="1.2"/>` },
    dns: { c: "#1B4FA0", s: `<circle cx="15" cy="15" r="7" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M8 15h14M15 8c2.5 2 2.5 12 0 14" stroke="#fff" stroke-width="1.2" fill="none"/>` },
    privatelink: { c: "#1B4FA0", s: `<path d="M14 18l-2 2a3 3 0 01-4.2-4.2l3-3a3 3 0 014.2 0" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M18 14l2-2a3 3 0 014.2 4.2l-3 3a3 3 0 01-4.2 0" fill="none" stroke="#fff" stroke-width="1.6"/>` },
    cdn: { c: "#1B4FA0", s: `<circle cx="16" cy="16" r="7" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="16" cy="9" r="1.6" fill="#fff"/><circle cx="9" cy="19" r="1.6" fill="#fff"/><circle cx="23" cy="19" r="1.6" fill="#fff"/>` },

    // Data
    sql: { c: "#6E33C7", s: `<path d="M9 11c0-1.7 3.1-3 7-3s7 1.3 7 3v10c0 1.7-3.1 3-7 3s-7-1.3-7-3z" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M9 11c0 1.7 3.1 3 7 3s7-1.3 7-3M9 16c0 1.7 3.1 3 7 3s7-1.3 7-3" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    cosmos: { c: "#6E33C7", s: `<circle cx="16" cy="16" r="2.4" fill="#fff"/><ellipse cx="16" cy="16" rx="8" ry="3.4" fill="none" stroke="#fff" stroke-width="1.3" transform="rotate(30 16 16)"/><ellipse cx="16" cy="16" rx="8" ry="3.4" fill="none" stroke="#fff" stroke-width="1.3" transform="rotate(-30 16 16)"/>` },
    storage: { c: "#6E33C7", s: `<rect x="9" y="9" width="14" height="14" rx="1.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M9 14h14M9 18h14M13 9v14" stroke="#fff" stroke-width="1.2"/>` },
    blob: { c: "#6E33C7", s: `<path d="M16 8c3 4 5 6 5 9a5 5 0 01-10 0c0-3 2-5 5-9z" fill="none" stroke="#fff" stroke-width="1.5"/>` },
    redis: { c: "#6E33C7", s: `<path d="M16 8l7 4v8l-7 4-7-4v-8z" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M9 12l7 4 7-4M16 16v8" stroke="#fff" stroke-width="1.2"/>` },
    datafactory: { c: "#6E33C7", s: `<circle cx="16" cy="16" r="4" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M16 8v3M16 21v3M8 16h3M21 16h3M10.3 10.3l2.1 2.1M19.6 19.6l2.1 2.1M21.7 10.3l-2.1 2.1M10.3 21.7l2.1-2.1" stroke="#fff" stroke-width="1.2"/>` },
    synapse: { c: "#6E33C7", s: `<path d="M16 8l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" fill="none" stroke="#fff" stroke-width="1.2"/>` },

    // Integration
    apim: { c: "#B5560E", s: `<path d="M12 9c-1.5 0-2.2.7-2.2 2.2v2.6c0 .9-.5 1.5-1.4 1.5v.4c.9 0 1.4.6 1.4 1.5v2.6C9.8 22.3 10.5 23 12 23" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M20 9c1.5 0 2.2.7 2.2 2.2v2.6c0 .9.5 1.5 1.4 1.5v.4c-.9 0-1.4.6-1.4 1.5v2.6c0 1.5-.7 2.2-2.2 2.2" fill="none" stroke="#fff" stroke-width="1.4"/>` },
    servicebus: { c: "#B5560E", s: `<rect x="8" y="10" width="16" height="12" rx="1.5" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M8 11.5l8 6 8-6" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    eventgrid: { c: "#B5560E", s: `<g fill="#fff"><circle cx="11" cy="11" r="1.6"/><circle cx="16" cy="11" r="1.6"/><circle cx="21" cy="11" r="1.6"/><circle cx="11" cy="16" r="1.6"/><circle cx="16" cy="16" r="1.6"/><circle cx="21" cy="16" r="1.6"/><circle cx="11" cy="21" r="1.6"/><circle cx="16" cy="21" r="1.6"/><circle cx="21" cy="21" r="1.6"/></g>` },
    eventhubs: { c: "#B5560E", s: `<path d="M13 10a8 8 0 000 12M17 8a11 11 0 000 16" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="10" cy="16" r="2" fill="#fff"/>` },
    logicapps: { c: "#B5560E", s: `<circle cx="10" cy="11" r="2" fill="#fff"/><circle cx="22" cy="11" r="2" fill="#fff"/><circle cx="16" cy="21" r="2" fill="#fff"/><path d="M10 13v2.5a2 2 0 002 2h1.5M22 13v2.5a2 2 0 01-2 2h-1.5" stroke="#fff" stroke-width="1.3" fill="none"/>` },

    // Security & identity
    keyvault: { c: "#157A4A", s: `<circle cx="13" cy="13" r="4" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M16 16l6 6M20 20l2-2M18 22l2-2" stroke="#fff" stroke-width="1.6" fill="none"/>` },
    entra: { c: "#157A4A", s: `<path d="M16 8l7 2.5v5c0 4.5-3 7-7 8.5-4-1.5-7-4-7-8.5v-5z" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="16" cy="14" r="1.8" fill="#fff"/><path d="M12.5 20c.5-2 2-3 3.5-3s3 1 3.5 3" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    defender: { c: "#157A4A", s: `<path d="M16 8l7 2.5v5c0 4.5-3 7-7 8.5-4-1.5-7-4-7-8.5v-5z" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M12.5 15.5l2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="1.6"/>` },

    // AI & machine learning
    openai: { c: "#7A2FBF", s: `<circle cx="16" cy="16" r="7.5" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M13 13.5c1.8-1.1 4.2-1.1 6 0s1.8 3.9 0 5-4.2 1.1-6 0" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="16" cy="16" r="1.4" fill="#fff"/>` },
    aisearch: { c: "#7A2FBF", s: `<circle cx="14" cy="14" r="5" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M17.7 17.7l4.3 4.3" stroke="#fff" stroke-width="1.8"/>` },
    aifoundry: { c: "#7A2FBF", s: `<rect x="11" y="11" width="10" height="10" rx="1.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M14 8v3M18 8v3M14 21v3M18 21v3M8 14h3M8 18h3M21 14h3M21 18h3" stroke="#fff" stroke-width="1.3"/>` },

    // Monitoring
    monitor: { c: "#0E7C86", s: `<path d="M8 16h4l2-5 4 10 2-5h4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` },
    loganalytics: { c: "#0E7C86", s: `<circle cx="14" cy="14" r="5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M12 13h4M12 15.5h3M17.7 17.7l4.3 4.3" stroke="#fff" stroke-width="1.4"/>` },
    appinsights: { c: "#0E7C86", s: `<path d="M9 22V14M14 22v-6M19 22v-10" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="20" cy="10" r="2.4" fill="none" stroke="#fff" stroke-width="1.4"/>` },

    // General assets
    user: { c: "#5B6B7B", s: `<circle cx="16" cy="13" r="3.4" fill="#fff"/><path d="M9 23c1-4 4-6 7-6s6 2 7 6" fill="none" stroke="#fff" stroke-width="1.6"/>` },
    users: { c: "#5B6B7B", s: `<circle cx="12" cy="13" r="2.8" fill="#fff"/><circle cx="21" cy="14" r="2.4" fill="#fff"/><path d="M7 22c.8-3 3-4.5 5-4.5s4.2 1.5 5 4.5" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M18 22c.6-2 1.8-3 3-3s2.4 1 3 3" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    client: { c: "#5B6B7B", s: `<rect x="8" y="9" width="16" height="13" rx="1.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M8 13h16" stroke="#fff" stroke-width="1.3"/><circle cx="11" cy="11" r=".8" fill="#fff"/><circle cx="13.6" cy="11" r=".8" fill="#fff"/>` },
    mobile: { c: "#5B6B7B", s: `<rect x="11" y="8" width="10" height="16" rx="2" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M15 21h2" stroke="#fff" stroke-width="1.4"/>` },
    internet: { c: "#5B6B7B", s: `<circle cx="16" cy="16" r="7.5" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M8.5 16h15M16 8.5c3 2.2 3 12.8 0 15M16 8.5c-3 2.2-3 12.8 0 15" fill="none" stroke="#fff" stroke-width="1.2"/>` },
    onprem: { c: "#5B6B7B", s: `<rect x="9" y="10" width="14" height="13" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M12 14h2M18 14h2M12 18h2M18 18h2M15 23v-3h2v3" stroke="#fff" stroke-width="1.3"/>` },
    database: { c: "#5B6B7B", s: `<path d="M9 11c0-1.7 3.1-3 7-3s7 1.3 7 3v10c0 1.7-3.1 3-7 3s-7-1.3-7-3z" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M9 11c0 1.7 3.1 3 7 3s7-1.3 7-3M9 16c0 1.7 3.1 3 7 3s7-1.3 7-3" fill="none" stroke="#fff" stroke-width="1.3"/>` },
    server: { c: "#5B6B7B", s: `<rect x="9" y="8" width="14" height="7" rx="1.3" fill="none" stroke="#fff" stroke-width="1.4"/><rect x="9" y="17" width="14" height="7" rx="1.3" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="12.5" cy="11.5" r="1" fill="#fff"/><circle cx="12.5" cy="20.5" r="1" fill="#fff"/>` },
    queue: { c: "#5B6B7B", s: `<rect x="8" y="12" width="4" height="8" rx="1" fill="#fff"/><rect x="14" y="12" width="4" height="8" rx="1" fill="#fff"/><rect x="20" y="12" width="4" height="8" rx="1" fill="none" stroke="#fff" stroke-width="1.4"/>` },
    kubernetes: { c: "#326CE5", s: `<path d="M16 7l6.9 3.5v7L16 21l-6.9-3.5v-7z" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="16" cy="14" r="2.2" fill="#fff"/><path d="M16 16.2v3.5M12.5 12.2l-1.8-1M19.5 12.2l1.8-1" stroke="#fff" stroke-width="1.2"/>` },
    external: { c: "#5B6B7B", s: `<rect x="9" y="11" width="11" height="11" rx="1.5" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M17 9h6v6M23 9l-6 6" stroke="#fff" stroke-width="1.5" fill="none"/>` },

    // Boundaries & scope
    boundary: { c: "#41546A", s: `<rect x="7" y="9" width="18" height="14" rx="2" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 2.5"/>` },
    region: { c: "#41546A", s: `<path d="M16 8c-3 0-5 2-5 5 0 4 5 11 5 11s5-7 5-11c0-3-2-5-5-5z" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="16" cy="13" r="1.8" fill="#fff"/>` },
    resourcegroup: { c: "#41546A", s: `<rect x="8" y="8" width="16" height="16" rx="2" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 2.5"/><rect x="12" y="12" width="8" height="8" rx="1" fill="#fff"/>` },
    subscription: { c: "#41546A", s: `<rect x="8" y="10" width="16" height="12" rx="2" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M8 14h16M11 18h5" stroke="#fff" stroke-width="1.3"/>` }
  };
  const FALLBACK = { c: "#5B6B7B", s: `<circle cx="16" cy="16" r="6" fill="none" stroke="#fff" stroke-width="1.6"/>` };

  function get(key) { return ICONS[key] || FALLBACK; }
  function inner(key) { const icon = get(key); return `<rect width="32" height="32" rx="7" fill="${icon.c}"/>${icon.s}`; }
  function svg(key, size) { return `<svg viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true" focusable="false">${inner(key)}</svg>`; }

  return { get, inner, svg, has: (key) => Object.prototype.hasOwnProperty.call(ICONS, key) };
})();
