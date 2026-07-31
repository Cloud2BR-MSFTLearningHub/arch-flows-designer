document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector("#designer");
  if (!shell) return;

  const assets = [
    { name: "App Service", type: "Compute", group: "compute-assets", glyph: "AS" },
    { name: "Azure Functions", type: "Compute", group: "compute-assets", glyph: "Fn" },
    { name: "AKS", type: "Compute", group: "compute-assets", glyph: "AK" },
    { name: "Virtual Machine", type: "Compute", group: "compute-assets", glyph: "VM" },
    { name: "API Management", type: "Integration", group: "platform-assets", glyph: "AP" },
    { name: "Azure SQL", type: "Data", group: "platform-assets", glyph: "SQL" },
    { name: "Storage Account", type: "Data", group: "platform-assets", glyph: "ST" },
    { name: "Service Bus", type: "Integration", group: "platform-assets", glyph: "SB" },
    { name: "Key Vault", type: "Security", group: "platform-assets", glyph: "KV" },
    { name: "User", type: "External", group: "general-assets", glyph: "US" },
    { name: "Internet", type: "External", group: "general-assets", glyph: "IN" },
    { name: "On-premises", type: "External", group: "general-assets", glyph: "OP" },
    { name: "Trust Boundary", type: "Container", group: "general-assets", glyph: "TB" }
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

  function uid() { return `node-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function nodeById(id) { return diagram.nodes.find((node) => node.id === id); }
  function markDirty(message = "Unsaved changes") { status.textContent = message; }
  function renderPalette(query = "") {
    document.querySelectorAll("[id$='-assets']").forEach((container) => { container.innerHTML = ""; });
    assets.filter((asset) => asset.name.toLowerCase().includes(query.toLowerCase())).forEach((asset) => {
      const button = document.createElement("button");
      button.className = "asset-button";
      button.type = "button";
      button.innerHTML = `<span class="asset-glyph">${asset.glyph}</span><span>${asset.name}</span>`;
      button.addEventListener("click", () => addNode(asset));
      document.querySelector(`#${asset.group}`).append(button);
    });
  }
  function addNode(asset) {
    const offset = diagram.nodes.length * 20;
    const node = { id: uid(), label: asset.name, type: asset.type, glyph: asset.glyph, environment: "Production", notes: "", x: 70 + (offset % 260), y: 80 + (offset % 180) };
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
      element.innerHTML = `<div class="node-top"><span class="node-icon">${node.glyph}</span><span class="node-label">${escapeHtml(node.label)}</span></div><div class="node-meta">${escapeHtml(node.environment)}</div>`;
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
      const startX = source.x + 142;
      const startY = source.y + 32;
      const endX = target.x;
      const endY = target.y + 32;
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
    const edges = diagram.edges.map((edge) => { const a = nodeById(edge.from); const b = nodeById(edge.to); return a && b ? `<path d="M ${a.x + 142} ${a.y + 32} C ${a.x + 185} ${a.y + 32}, ${b.x - 43} ${b.y + 32}, ${b.x} ${b.y + 32}" fill="none" stroke="#2a6b9d" stroke-width="2"/>` : ""; }).join("");
    const nodes = diagram.nodes.map((node) => `<g transform="translate(${node.x},${node.y})"><rect width="142" height="65" rx="5" fill="#fff" stroke="#8badc6"/><rect x="8" y="9" width="24" height="24" rx="4" fill="#e3f1fb"/><text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="#006ea9">${escapeHtml(node.glyph)}</text><text x="40" y="24" font-family="Arial" font-size="11" font-weight="700" fill="#142b42">${escapeHtml(node.label)}</text><text x="40" y="50" font-family="Arial" font-size="8" fill="#688099">${escapeHtml(node.environment.toUpperCase())}</text></g>`).join("");
    download("arch-flow-diagram.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f8fbfd"/>${edges}${nodes}</svg>`, "image/svg+xml"); status.textContent = "SVG exported";
  });
  document.querySelector("#clear-diagram").addEventListener("click", () => { diagram = { version: 1, nodes: [], edges: [] }; selectedId = null; connectingFrom = null; markDirty("Canvas cleared"); render(); });
  window.addEventListener("resize", renderConnections);
  renderPalette();
  render();
});