document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector("#designer");
  if (!shell) return;

  const categories = [
    ["Compute", "Azure compute"],
    ["Networking", "Azure networking"],
    ["Data", "Azure data"],
    ["Integration", "Azure integration"],
    ["Security", "Security & identity"],
    ["AI", "AI & machine learning"],
    ["Monitoring", "Monitoring"],
    ["General", "General assets"],
    ["Structure", "Boundaries & scope"]
  ];
  const assets = [
    { name: "App Service", type: "Compute", category: "Compute", icon: "appservice" },
    { name: "Function App", type: "Compute", category: "Compute", icon: "functions" },
    { name: "AKS", type: "Compute", category: "Compute", icon: "aks" },
    { name: "Container Apps", type: "Compute", category: "Compute", icon: "containerapps" },
    { name: "Virtual Machine", type: "Compute", category: "Compute", icon: "vm" },
    { name: "VM Scale Set", type: "Compute", category: "Compute", icon: "vmss" },
    { name: "Virtual Network", type: "Networking", category: "Networking", icon: "vnet" },
    { name: "Load Balancer", type: "Networking", category: "Networking", icon: "loadbalancer" },
    { name: "Application Gateway", type: "Networking", category: "Networking", icon: "appgateway" },
    { name: "Front Door", type: "Networking", category: "Networking", icon: "frontdoor" },
    { name: "Azure Firewall", type: "Networking", category: "Networking", icon: "firewall" },
    { name: "Azure DNS", type: "Networking", category: "Networking", icon: "dns" },
    { name: "Private Link", type: "Networking", category: "Networking", icon: "privatelink" },
    { name: "Azure CDN", type: "Networking", category: "Networking", icon: "cdn" },
    { name: "Azure SQL", type: "Data", category: "Data", icon: "sql" },
    { name: "Cosmos DB", type: "Data", category: "Data", icon: "cosmos" },
    { name: "Storage Account", type: "Data", category: "Data", icon: "storage" },
    { name: "Blob Storage", type: "Data", category: "Data", icon: "blob" },
    { name: "Cache for Redis", type: "Data", category: "Data", icon: "redis" },
    { name: "Data Factory", type: "Data", category: "Data", icon: "datafactory" },
    { name: "Synapse Analytics", type: "Data", category: "Data", icon: "synapse" },
    { name: "API Management", type: "Integration", category: "Integration", icon: "apim" },
    { name: "Service Bus", type: "Integration", category: "Integration", icon: "servicebus" },
    { name: "Event Grid", type: "Integration", category: "Integration", icon: "eventgrid" },
    { name: "Event Hubs", type: "Integration", category: "Integration", icon: "eventhubs" },
    { name: "Logic Apps", type: "Integration", category: "Integration", icon: "logicapps" },
    { name: "Key Vault", type: "Security", category: "Security", icon: "keyvault" },
    { name: "Microsoft Entra ID", type: "Identity", category: "Security", icon: "entra" },
    { name: "Defender for Cloud", type: "Security", category: "Security", icon: "defender" },
    { name: "Azure OpenAI", type: "AI", category: "AI", icon: "openai" },
    { name: "AI Search", type: "AI", category: "AI", icon: "aisearch" },
    { name: "AI Foundry", type: "AI", category: "AI", icon: "aifoundry" },
    { name: "Azure Monitor", type: "Monitoring", category: "Monitoring", icon: "monitor" },
    { name: "Log Analytics", type: "Monitoring", category: "Monitoring", icon: "loganalytics" },
    { name: "Application Insights", type: "Monitoring", category: "Monitoring", icon: "appinsights" },
    { name: "User", type: "Actor", category: "General", icon: "user" },
    { name: "User Group", type: "Actor", category: "General", icon: "users" },
    { name: "Client App", type: "Client", category: "General", icon: "client" },
    { name: "Mobile App", type: "Client", category: "General", icon: "mobile" },
    { name: "Internet", type: "Network", category: "General", icon: "internet" },
    { name: "On-premises", type: "Datacenter", category: "General", icon: "onprem" },
    { name: "Database", type: "Data", category: "General", icon: "database" },
    { name: "Server", type: "Compute", category: "General", icon: "server" },
    { name: "Message Queue", type: "Integration", category: "General", icon: "queue" },
    { name: "Kubernetes", type: "Compute", category: "General", icon: "kubernetes" },
    { name: "External System", type: "External", category: "General", icon: "external" },
    { name: "Trust Boundary", type: "Boundary", category: "Structure", icon: "boundary" },
    { name: "Region", type: "Scope", category: "Structure", icon: "region" },
    { name: "Resource Group", type: "Scope", category: "Structure", icon: "resourcegroup" },
    { name: "Subscription", type: "Scope", category: "Structure", icon: "subscription" }
  ];
  const stage = document.querySelector("#diagram-stage");
  const lines = document.querySelector("#connection-layer");
  const empty = document.querySelector("#canvas-empty");
  const status = document.querySelector("#diagram-status");
  const selectionStatus = document.querySelector("#selection-status");
  const form = document.querySelector("#node-form");
  const inspectorEmpty = document.querySelector("#inspector-empty");
  const labelInput = document.querySelector("#node-label");
  const typeInput = document.querySelector("#node-type");
  const environmentInput = document.querySelector("#node-environment");
  const notesInput = document.querySelector("#node-notes");
  let diagram = { version: 1, nodes: [], edges: [] };
  let selectedId = null;
  let connectingFrom = null;
  let drag = null;
  const NODE_W = 120;
  const NODE_H = 116;

  function uid() { return `node-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function nodeById(id) { return diagram.nodes.find((node) => node.id === id); }
  function markDirty(message = "Unsaved changes") { status.textContent = message; }
  function renderPalette(query = "") {
    const catalog = document.querySelector("#asset-catalog");
    const emptyMessage = document.querySelector("#catalog-empty");
    const term = query.trim().toLowerCase();
    catalog.innerHTML = "";
    categories.forEach(([key, label]) => {
      const matches = assets.filter((asset) => asset.category === key && asset.name.toLowerCase().includes(term));
      if (!matches.length) return;
      const section = document.createElement("div");
      section.className = "asset-category";
      const title = document.createElement("span");
      title.textContent = label;
      section.append(title);
      matches.forEach((asset) => {
        const button = document.createElement("button");
        button.className = "asset-button";
        button.type = "button";
        button.innerHTML = `<span class="asset-glyph">${window.ArchIcons.svg(asset.icon, 22)}</span><span>${asset.name}</span>`;
        button.addEventListener("click", () => addNode(asset));
        section.append(button);
      });
      catalog.append(section);
    });
    if (emptyMessage) emptyMessage.hidden = catalog.children.length > 0;
  }
  function addNode(asset) {
    const offset = diagram.nodes.length * 20;
    const node = { id: uid(), label: asset.name, type: asset.type, icon: asset.icon, environment: "Production", notes: "", x: 70 + (offset % 260), y: 80 + (offset % 180) };
    diagram.nodes.push(node);
    selectedId = node.id;
    markDirty();
    render();
  }
  function render() {
    stage.querySelectorAll(".architecture-node").forEach((element) => element.remove());
    empty.hidden = diagram.nodes.length > 0;
    diagram.nodes.forEach((node) => {
      const element = document.createElement("article");
      element.className = `architecture-node${node.id === selectedId ? " is-selected" : ""}${connectingFrom && node.id !== connectingFrom ? " is-connect-target" : ""}`;
      element.dataset.nodeId = node.id;
      element.style.left = `${node.x}px`;
      element.style.top = `${node.y}px`;
      element.innerHTML = `<span class="node-icon">${window.ArchIcons.svg(node.icon, 48)}</span><span class="node-label">${escapeHtml(node.label)}</span>`;
      element.addEventListener("pointerdown", beginDrag);
      element.addEventListener("click", selectNode);
      stage.append(element);
    });
    renderConnections();
    renderInspector();
    selectionStatus.textContent = `${diagram.nodes.length} ${diagram.nodes.length === 1 ? "asset" : "assets"}`;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]); }
  function renderConnections() {
    const bounds = stage.getBoundingClientRect();
    lines.innerHTML = "";
    lines.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    diagram.edges.forEach((edge) => {
      const source = nodeById(edge.from);
      const target = nodeById(edge.to);
      if (!source || !target) return;
      const startX = source.x + NODE_W;
      const startY = source.y + NODE_H / 2;
      const endX = target.x;
      const endY = target.y + NODE_H / 2;
      const bend = Math.max(35, Math.abs(endX - startX) / 2);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`);
      lines.append(path);
    });
  }
  function selectNode(event) {
    event.stopPropagation();
    const nodeId = event.currentTarget.dataset.nodeId;
    if (connectingFrom && connectingFrom !== nodeId) {
      diagram.edges.push({ id: uid(), from: connectingFrom, to: nodeId });
      connectingFrom = null;
      markDirty("Connection added");
    }
    selectedId = nodeId;
    render();
  }
  function beginDrag(event) {
    if (event.button !== 0) return;
    const node = nodeById(event.currentTarget.dataset.nodeId);
    drag = { id: node.id, startX: event.clientX, startY: event.clientY, x: node.x, y: node.y, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  window.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const node = nodeById(drag.id);
    node.x = Math.max(8, drag.x + event.clientX - drag.startX);
    node.y = Math.max(8, drag.y + event.clientY - drag.startY);
    drag.moved = true;
    render();
  });
  window.addEventListener("pointerup", () => {
    if (!drag) return;
    if (drag.moved) markDirty();
    drag = null;
  });
  function renderInspector() {
    const node = nodeById(selectedId);
    form.hidden = !node;
    inspectorEmpty.hidden = Boolean(node);
    if (!node) return;
    labelInput.value = node.label;
    typeInput.value = node.type;
    environmentInput.value = node.environment;
    notesInput.value = node.notes;
  }
  function updateSelected() {
    const node = nodeById(selectedId);
    if (!node) return;
    node.label = labelInput.value.trim() || node.type;
    node.environment = environmentInput.value;
    node.notes = notesInput.value;
    markDirty();
    render();
  }
  [labelInput, environmentInput, notesInput].forEach((input) => input.addEventListener("change", updateSelected));
  document.querySelector("#connect-node").addEventListener("click", () => {
    if (!selectedId) return;
    connectingFrom = selectedId;
    status.textContent = "Select the target asset";
    render();
  });
  document.querySelector("#delete-node").addEventListener("click", () => {
    if (!selectedId) return;
    diagram.nodes = diagram.nodes.filter((node) => node.id !== selectedId);
    diagram.edges = diagram.edges.filter((edge) => edge.from !== selectedId && edge.to !== selectedId);
    selectedId = null;
    connectingFrom = null;
    markDirty("Asset deleted");
    render();
  });
  stage.addEventListener("click", () => { if (!connectingFrom) { selectedId = null; render(); } });
  document.querySelector("#asset-search").addEventListener("input", (event) => renderPalette(event.target.value));
  document.querySelector("#auto-layout").addEventListener("click", () => {
    const width = Math.max(stage.clientWidth - 170, 160);
    diagram.nodes.forEach((node, index) => { node.x = 25 + (index % 3) * Math.min(190, width / 3); node.y = 50 + Math.floor(index / 3) * 115; });
    markDirty("Arranged"); render();
  });
  function download(filename, content, type) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); URL.revokeObjectURL(link.href);
  }
  document.querySelector("#save-diagram").addEventListener("click", () => { download("arch-flow-diagram.json", JSON.stringify(diagram, null, 2), "application/json"); status.textContent = "JSON saved"; });
  document.querySelector("#load-diagram").addEventListener("click", () => document.querySelector("#load-input").click());
  document.querySelector("#load-input").addEventListener("change", (event) => {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { const next = JSON.parse(reader.result); if (!Array.isArray(next.nodes) || !Array.isArray(next.edges)) throw new Error(); diagram = next; selectedId = null; markDirty("Diagram loaded"); render(); } catch { status.textContent = "Invalid diagram file"; } };
    reader.readAsText(file);
  });
  document.querySelector("#export-svg").addEventListener("click", () => {
    const width = Math.max(stage.clientWidth, 800); const height = Math.max(stage.clientHeight, 540);
    const edges = diagram.edges.map((edge) => { const a = nodeById(edge.from); const b = nodeById(edge.to); return a && b ? `<path d="M ${a.x + NODE_W} ${a.y + NODE_H / 2} C ${a.x + NODE_W + 40} ${a.y + NODE_H / 2}, ${b.x - 40} ${b.y + NODE_H / 2}, ${b.x} ${b.y + NODE_H / 2}" fill="none" stroke="#2a6b9d" stroke-width="2"/>` : ""; }).join("");
    const nodes = diagram.nodes.map((node) => `<g transform="translate(${node.x},${node.y})"><rect width="${NODE_W}" height="${NODE_H}" rx="6" fill="#fff" stroke="#8badc6"/><svg x="${(NODE_W - 34) / 2}" y="8" width="34" height="34" viewBox="0 0 32 32">${window.ArchIcons.inner(node.icon)}</svg><text x="${NODE_W / 2}" y="58" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#142b42">${escapeHtml(node.label)}</text></g>`).join("");
    download("arch-flow-diagram.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f8fbfd"/>${edges}${nodes}</svg>`, "image/svg+xml"); status.textContent = "SVG exported";
  });
  document.querySelector("#clear-diagram").addEventListener("click", () => { diagram = { version: 1, nodes: [], edges: [] }; selectedId = null; connectingFrom = null; markDirty("Canvas cleared"); render(); });
  window.addEventListener("resize", renderConnections);
  renderPalette();
  render();
});