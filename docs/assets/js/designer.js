document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector("#designer");
  if (!shell) return;

  const architectureCategories = [
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
  const architectureAssets = [
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
  const flowCategories = [
    ["Flow", "Flow control"],
    ["Algorithm", "Algorithm control"],
    ["Work", "Work & decisions"],
    ["Information", "Information & handoffs"],
    ["Participants", "Participants & systems"]
  ];
  const flowAssets = [
    { name: "Start", type: "Start", category: "Flow", icon: "flowstart" },
    { name: "End", type: "End", category: "Flow", icon: "flowend" },
    { name: "Loop", type: "Loop", category: "Algorithm", icon: "flowloop" },
    { name: "Merge", type: "Merge", category: "Algorithm", icon: "flowmerge" },
    { name: "Subprocess", type: "Subprocess", category: "Algorithm", icon: "flowsubprocess" },
    { name: "Process", type: "Process", category: "Work", icon: "flowprocess" },
    { name: "Decision", type: "Decision", category: "Work", icon: "flowdecision" },
    { name: "Manual Task", type: "Task", category: "Work", icon: "flowtask" },
    { name: "Approval", type: "Approval", category: "Work", icon: "flowapproval" },
    { name: "Input / Output", type: "Input or output", category: "Information", icon: "flowinput" },
    { name: "Document", type: "Document", category: "Information", icon: "flowdocument" },
    { name: "Data Store", type: "Data", category: "Information", icon: "database" },
    { name: "Message", type: "Message", category: "Information", icon: "queue" },
    { name: "User", type: "Participant", category: "Participants", icon: "user" },
    { name: "Team", type: "Participant", category: "Participants", icon: "users" },
    { name: "External System", type: "System", category: "Participants", icon: "external" },
    { name: "Application", type: "System", category: "Participants", icon: "client" }
  ];
  const isFlowMode = shell.dataset.mode === "flow";
  const categories = isFlowMode ? flowCategories : architectureCategories;
  const assets = isFlowMode ? flowAssets : architectureAssets;
  const unitNoun = isFlowMode ? "symbol" : "asset";
  const stage = document.querySelector("#diagram-stage");
  const lines = document.querySelector("#connection-layer");
  const empty = document.querySelector("#canvas-empty");
  const status = document.querySelector("#diagram-status");
  const selectionStatus = document.querySelector("#selection-status");
  const form = document.querySelector("#node-form");
  const edgeForm = document.querySelector("#edge-form");
  const inspectorEmpty = document.querySelector("#inspector-empty");
  const deleteNodeButton = document.querySelector("#delete-node");
  const labelInput = document.querySelector("#node-label");
  const typeInput = document.querySelector("#node-type");
  const environmentInput = document.querySelector("#node-environment");
  const notesInput = document.querySelector("#node-notes");
  const edgeFromSideInput = document.querySelector("#edge-from-side");
  const edgeToSideInput = document.querySelector("#edge-to-side");
  const edgeLabelInput = document.querySelector("#edge-label");
  const edgeFromLabel = document.querySelector("#edge-from-label");
  const edgeToLabel = document.querySelector("#edge-to-label");
  let diagram = { version: 1, nodes: [], edges: [] };
  let selectedId = null;
  let selectedEdgeId = null;
  let connectingFrom = null;
  let connectingFromSide = null;
  let connectingTo = null;
  let drag = null;
  const NODE_W = isFlowMode ? 136 : 120;
  const NODE_H = isFlowMode ? 72 : 116;

  function uid() { return `node-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function nodeById(id) { return diagram.nodes.find((node) => node.id === id); }
  function edgeById(id) { return diagram.edges.find((edge) => edge.id === id); }
  function markDirty(message = "Unsaved changes") { status.textContent = message; }
  function flowNode(label, type, icon, x, y) { return { id: uid(), label, type, icon, environment: "Production", notes: "", x, y }; }
  const flowTemplates = {
    algorithm: { nodes: [
      ["Start", "Start", "flowstart"], ["Read input", "Input or output", "flowinput"], ["More items?", "Decision", "flowdecision"], ["Process next item", "Process", "flowprocess"], ["Show result", "Input or output", "flowinput"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3, "Yes"], [2, 4, "No"], [3, 2, "Next item"], [4, 5]] },
    approval: { nodes: [
      ["Start", "Start", "flowstart"], ["Submit request", "Process", "flowprocess"], ["Review request", "Task", "flowtask"], ["Approved?", "Decision", "flowdecision"], ["Notify requester", "Message", "queue"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3], [3, 4, "Yes / No"], [4, 5]] },
    presentation: { nodes: [
      ["Start", "Start", "flowstart"], ["Set the context", "Process", "flowprocess"], ["Present the insight", "Document", "flowdocument"], ["Make the recommendation", "Approval", "flowapproval"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3], [3, 4]] },
    incident: { nodes: [
      ["Alert received", "Start", "flowstart"], ["Triage incident", "Process", "flowprocess"], ["Service impacted?", "Decision", "flowdecision"], ["Contain and recover", "Subprocess", "flowsubprocess"], ["Record outcome", "Document", "flowdocument"], ["Close incident", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3, "Yes"], [2, 4, "No"], [3, 4], [4, 5]] }
  };
  function applyFlowTemplate(templateName) {
    const template = flowTemplates[templateName];
    if (!template) return;
    diagram = { version: 1, nodes: template.nodes.map(([label, type, icon]) => flowNode(label, type, icon, 8, 8)), edges: [] };
    template.edges.forEach(([from, to, label]) => diagram.edges.push({ id: uid(), from: diagram.nodes[from].id, to: diagram.nodes[to].id, label, fromSide: "bottom", toSide: "top" }));
    selectedId = diagram.nodes[0].id;
    selectedEdgeId = null;
    connectingFrom = null;
    connectingFromSide = null;
    connectingTo = null;
    arrangeDiagram("Template arranged - edit any step");
  }
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
    const offset = diagram.nodes.length;
    const node = { id: uid(), label: asset.name, type: asset.type, icon: asset.icon, environment: "Production", notes: "", x: isFlowMode ? 90 + (offset % 3) * 170 : 70 + (offset * 20 % 260), y: isFlowMode ? 60 + Math.floor(offset / 3) * 150 : 80 + (offset * 20 % 180) };
    diagram.nodes.push(node);
    selectedId = node.id;
    selectedEdgeId = null;
    markDirty();
    render();
  }
  function render() {
    stage.querySelectorAll(".architecture-node").forEach((element) => element.remove());
    empty.hidden = diagram.nodes.length > 0;
    diagram.nodes.forEach((node) => {
      const element = document.createElement("article");
      const shape = isFlowMode ? flowShapeFor(node.type) : "asset";
      element.className = `architecture-node${isFlowMode ? ` flow-node flow-node--${shape}` : ""}${node.id === selectedId ? " is-selected" : ""}${connectingFrom && connectingFromSide && node.id !== connectingFrom ? " is-connect-target" : ""}`;
      element.dataset.nodeId = node.id;
      element.style.left = `${node.x}px`;
      element.style.top = `${node.y}px`;
      element.innerHTML = isFlowMode
        ? `<span class="flow-node__content"><span class="flow-node__type">${escapeHtml(node.type)}</span><span class="node-label">${escapeHtml(node.label)}</span></span>${connectionPorts(node)}`
        : `<span class="node-icon">${window.ArchIcons.svg(node.icon, 48)}</span><span class="node-label">${escapeHtml(node.label)}</span>${connectionPorts(node)}`;
      element.addEventListener("pointerdown", beginDrag);
      element.addEventListener("click", selectNode);
      element.querySelectorAll(".connection-port").forEach((port) => {
        port.addEventListener("pointerdown", (event) => event.stopPropagation());
        port.addEventListener("click", selectConnectionPort);
      });
      stage.append(element);
    });
    renderConnections();
    renderInspector();
    selectionStatus.textContent = selectedEdgeId ? "1 arrow selected" : `${diagram.nodes.length} ${diagram.nodes.length === 1 ? unitNoun : `${unitNoun}s`}`;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]); }
  function connectionPorts(node) {
    if (node.id !== selectedId) return "";
    return ["top", "right", "bottom", "left"].map((side) => `<button class="connection-port connection-port--${side}" type="button" data-side="${side}" title="${connectingTo === node.id ? "Finish arrow at" : "Start arrow from"} ${side}"><span class="visually-hidden">${side} connection point</span></button>`).join("");
  }
  function flowShapeFor(type) {
    const shapes = {
      "Start": "terminator", "End": "terminator", "Decision": "decision", "Input or output": "input-output",
      "Document": "document", "Data": "data", "Subprocess": "subprocess", "Loop": "loop", "Merge": "merge"
    };
    return shapes[type] || "process";
  }
  function portPosition(node, side) {
    if (isFlowMode) {
      const shape = flowShapeFor(node.type);
      const insetX = shape === "decision" ? 34 : 4;
      const insetY = shape === "decision" ? 1 : 8;
      const positions = {
        top: { x: node.x + NODE_W / 2, y: node.y + insetY, dx: 0, dy: -1 },
        right: { x: node.x + NODE_W - insetX, y: node.y + NODE_H / 2, dx: 1, dy: 0 },
        bottom: { x: node.x + NODE_W / 2, y: node.y + NODE_H - insetY, dx: 0, dy: 1 },
        left: { x: node.x + insetX, y: node.y + NODE_H / 2, dx: -1, dy: 0 }
      };
      return positions[side];
    }
    const positions = {
      top: { x: node.x + NODE_W / 2, y: node.y, dx: 0, dy: -1 },
      right: { x: node.x + NODE_W, y: node.y + NODE_H / 2, dx: 1, dy: 0 },
      bottom: { x: node.x + NODE_W / 2, y: node.y + NODE_H, dx: 0, dy: 1 },
      left: { x: node.x, y: node.y + NODE_H / 2, dx: -1, dy: 0 }
    };
    return positions[side];
  }
  function connectionGeometry(source, target, edge = {}) {
    if (edge.fromSide && edge.toSide) {
      const start = portPosition(source, edge.fromSide);
      const end = portPosition(target, edge.toSide);
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      const horizontalPair = start.dy === 0 && end.dy === 0;
      const verticalPair = start.dx === 0 && end.dx === 0;
      const sidesFaceEachOther = (edge.fromSide === "right" && edge.toSide === "left" && start.x <= end.x)
        || (edge.fromSide === "left" && edge.toSide === "right" && start.x >= end.x)
        || (edge.fromSide === "bottom" && edge.toSide === "top" && start.y <= end.y)
        || (edge.fromSide === "top" && edge.toSide === "bottom" && start.y >= end.y);
      const stubLength = 24;
      const startStub = { x: start.x + start.dx * stubLength, y: start.y + start.dy * stubLength };
      const endStub = { x: end.x + end.dx * stubLength, y: end.y + end.dy * stubLength };
      if (horizontalPair && !sidesFaceEachOther) {
        const topRoute = Math.min(source.y, target.y) - 36;
        const routeY = topRoute >= 8 ? topRoute : Math.max(source.y + NODE_H, target.y + NODE_H) + 36;
        return { startX: start.x, startY: start.y, endX: end.x, endY: end.y, labelX: (startStub.x + endStub.x) / 2, labelY: routeY - 6, path: `M ${start.x} ${start.y} L ${startStub.x} ${startStub.y} L ${startStub.x} ${routeY} L ${endStub.x} ${routeY} L ${endStub.x} ${endStub.y} L ${end.x} ${end.y}` };
      }
      if (verticalPair && !sidesFaceEachOther) {
        const rightRoute = Math.max(source.x + NODE_W, target.x + NODE_W) + 36;
        const routeX = rightRoute < stage.clientWidth - 8 ? rightRoute : Math.max(8, Math.min(source.x, target.x) - 36);
        return { startX: start.x, startY: start.y, endX: end.x, endY: end.y, labelX: routeX, labelY: (startStub.y + endStub.y) / 2 - 6, path: `M ${start.x} ${start.y} L ${startStub.x} ${startStub.y} L ${routeX} ${startStub.y} L ${routeX} ${endStub.y} L ${endStub.x} ${endStub.y} L ${end.x} ${end.y}` };
      }
      const offset = Math.max(28, Math.min(60, distance / 3));
      const control1 = { x: start.x + start.dx * offset, y: start.y + start.dy * offset };
      const control2 = { x: end.x + end.dx * offset, y: end.y + end.dy * offset };
      const labelX = (start.x + 3 * control1.x + 3 * control2.x + end.x) / 8;
      const labelY = (start.y + 3 * control1.y + 3 * control2.y + end.y) / 8 - 6;
      return { startX: start.x, startY: start.y, endX: end.x, endY: end.y, labelX, labelY, path: `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}` };
    }
    if (!isFlowMode) {
      const startX = source.x + NODE_W;
      const startY = source.y + NODE_H / 2;
      const endX = target.x;
      const endY = target.y + NODE_H / 2;
      const bend = Math.max(35, Math.abs(endX - startX) / 2);
      return { startX, startY, endX, endY, labelX: (startX + endX) / 2, labelY: (startY + endY) / 2 - 6, path: `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}` };
    }

    const sourceCenterX = source.x + NODE_W / 2;
    const targetCenterX = target.x + NODE_W / 2;
    if (target.y > source.y + NODE_H / 2) {
      const startY = source.y + NODE_H;
      const endY = target.y;
      const bend = Math.max(2, (endY - startY) / 2);
      return { startX: sourceCenterX, startY, endX: targetCenterX, endY, labelX: (sourceCenterX + targetCenterX) / 2, labelY: (startY + endY) / 2 - 6, path: `M ${sourceCenterX} ${startY} C ${sourceCenterX} ${startY + bend}, ${targetCenterX} ${endY - bend}, ${targetCenterX} ${endY}` };
    }

    const routeRight = Math.max(source.x, target.x) + NODE_W + 38 < stage.clientWidth;
    const sourceX = routeRight ? source.x + NODE_W : source.x;
    const targetX = routeRight ? target.x + NODE_W : target.x;
    const routeX = routeRight ? Math.max(sourceX, targetX) + 34 : Math.max(8, Math.min(sourceX, targetX) - 34);
    const startY = source.y + NODE_H / 2;
    const endY = target.y + NODE_H / 2;
    return { startX: sourceX, startY, endX: targetX, endY, labelX: routeX, labelY: (startY + endY) / 2 - 6, path: `M ${sourceX} ${startY} C ${routeX} ${startY}, ${routeX} ${endY}, ${targetX} ${endY}` };
  }
  function renderConnections() {
    const bounds = stage.getBoundingClientRect();
    lines.innerHTML = `<defs><marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto" overflow="visible"><path d="M 0 0 L 8 4 L 0 8 z" fill="#2a6b9d"/></marker></defs>`;
    lines.removeAttribute("aria-hidden");
    lines.setAttribute("aria-label", "Diagram arrows");
    lines.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    diagram.edges.forEach((edge) => {
      const source = nodeById(edge.from);
      const target = nodeById(edge.to);
      if (!source || !target) return;
      const geometry = connectionGeometry(source, target, edge);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", geometry.path);
      path.setAttribute("marker-end", "url(#flow-arrow)");
      path.setAttribute("class", `connection-path${edge.id === selectedEdgeId ? " is-selected" : ""}`);
      lines.append(path);
      const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      hitPath.setAttribute("d", geometry.path);
      hitPath.setAttribute("class", "connection-hit");
      hitPath.setAttribute("data-edge-id", edge.id);
      hitPath.setAttribute("role", "button");
      hitPath.setAttribute("tabindex", "0");
      hitPath.setAttribute("aria-label", `Arrow from ${source.label} to ${target.label}`);
      hitPath.addEventListener("click", selectEdge);
      hitPath.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") selectEdge(event);
      });
      lines.append(hitPath);
      if (edge.label) {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", String(geometry.labelX));
        label.setAttribute("y", String(geometry.labelY));
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "connection-label");
        label.setAttribute("data-edge-id", edge.id);
        label.addEventListener("click", selectEdge);
        label.textContent = edge.label;
        lines.append(label);
      }
    });
  }
  function selectNode(event) {
    event.stopPropagation();
    const nodeId = event.currentTarget.dataset.nodeId;
    selectedEdgeId = null;
    if (connectingFrom && connectingFromSide && connectingFrom !== nodeId) {
      connectingTo = nodeId;
      selectedId = nodeId;
      status.textContent = "Choose where the arrow ends";
      render();
      return;
    }
    selectedId = nodeId;
    render();
  }
  function selectEdge(event) {
    event.preventDefault();
    event.stopPropagation();
    selectedEdgeId = event.currentTarget.dataset.edgeId;
    selectedId = null;
    connectingFrom = null;
    connectingFromSide = null;
    connectingTo = null;
    markDirty("Arrow selected");
    render();
  }
  function selectConnectionPort(event) {
    event.stopPropagation();
    const nodeId = event.currentTarget.closest(".architecture-node").dataset.nodeId;
    const side = event.currentTarget.dataset.side;
    if (connectingFrom && connectingTo === nodeId) {
      if (!diagram.edges.some((edge) => edge.from === connectingFrom && edge.to === nodeId && edge.fromSide === connectingFromSide && edge.toSide === side)) {
        diagram.edges.push({ id: uid(), from: connectingFrom, to: nodeId, fromSide: connectingFromSide, toSide: side });
      }
      connectingFrom = null;
      connectingFromSide = null;
      connectingTo = null;
      markDirty("Arrow connected");
      render();
      return;
    }
    connectingFrom = nodeId;
    connectingFromSide = side;
    connectingTo = null;
    selectedId = nodeId;
    selectedEdgeId = null;
    status.textContent = "Select the target object";
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
    const edge = edgeById(selectedEdgeId);
    form.hidden = !node;
    edgeForm.hidden = !edge;
    inspectorEmpty.hidden = Boolean(node || edge);
    deleteNodeButton.hidden = !node;
    if (edge) {
      edgeFromSideInput.value = edge.fromSide || "";
      edgeToSideInput.value = edge.toSide || "";
      edgeLabelInput.value = edge.label || "";
      edgeFromLabel.textContent = nodeById(edge.from)?.label || "Unknown";
      edgeToLabel.textContent = nodeById(edge.to)?.label || "Unknown";
    }
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
  function updateEdgeSide(field, value) {
    const edge = edgeById(selectedEdgeId);
    if (!edge) return;
    if (!value) {
      delete edge.fromSide;
      delete edge.toSide;
    } else {
      edge[field] = value;
      if (!edge.fromSide) edge.fromSide = isFlowMode ? "bottom" : "right";
      if (!edge.toSide) edge.toSide = isFlowMode ? "top" : "left";
    }
    markDirty("Arrow realigned");
    render();
  }
  edgeFromSideInput.addEventListener("change", (event) => updateEdgeSide("fromSide", event.target.value));
  edgeToSideInput.addEventListener("change", (event) => updateEdgeSide("toSide", event.target.value));
  edgeLabelInput.addEventListener("change", () => {
    const edge = edgeById(selectedEdgeId);
    if (!edge) return;
    edge.label = edgeLabelInput.value.trim();
    markDirty("Arrow label updated");
    render();
  });
  document.querySelector("#reverse-edge").addEventListener("click", () => {
    const edge = edgeById(selectedEdgeId);
    if (!edge) return;
    [edge.from, edge.to] = [edge.to, edge.from];
    [edge.fromSide, edge.toSide] = [edge.toSide, edge.fromSide];
    markDirty("Arrow reversed");
    render();
  });
  document.querySelector("#delete-edge").addEventListener("click", () => {
    if (!selectedEdgeId) return;
    diagram.edges = diagram.edges.filter((edge) => edge.id !== selectedEdgeId);
    selectedEdgeId = null;
    markDirty("Arrow deleted");
    render();
  });
  document.querySelector("#connect-node").addEventListener("click", () => {
    if (!selectedId) return;
    connectingFrom = selectedId;
    selectedEdgeId = null;
    connectingFromSide = null;
    connectingTo = null;
    status.textContent = "Choose where the arrow starts";
    render();
  });
  deleteNodeButton.addEventListener("click", () => {
    if (!selectedId) return;
    diagram.nodes = diagram.nodes.filter((node) => node.id !== selectedId);
    diagram.edges = diagram.edges.filter((edge) => edge.from !== selectedId && edge.to !== selectedId);
    selectedId = null;
    selectedEdgeId = null;
    connectingFrom = null;
    connectingFromSide = null;
    connectingTo = null;
    markDirty(`${isFlowMode ? "Symbol" : "Asset"} deleted`);
    render();
  });
  stage.addEventListener("click", () => {
    const wasConnecting = Boolean(connectingFrom);
    selectedId = null;
    selectedEdgeId = null;
    connectingFrom = null;
    connectingFromSide = null;
    connectingTo = null;
    if (wasConnecting) markDirty("Connection cancelled");
    render();
  });
  document.querySelector("#asset-search").addEventListener("input", (event) => renderPalette(event.target.value));
  document.querySelectorAll("[data-template]").forEach((button) => button.addEventListener("click", () => applyFlowTemplate(button.dataset.template)));
  function arrangeDiagram(message) {
    if (!diagram.nodes.length) return;

    const nodeIds = new Set(diagram.nodes.map((node) => node.id));
    const incoming = new Map(diagram.nodes.map((node) => [node.id, []]));
    const outgoing = new Map(diagram.nodes.map((node) => [node.id, []]));
    diagram.edges.forEach((edge) => {
      if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to) || edge.from === edge.to) return;
      outgoing.get(edge.from).push(edge.to);
      incoming.get(edge.to).push(edge.from);
    });

    const levels = new Map();
    const roots = diagram.nodes.filter((node) => incoming.get(node.id).length === 0).map((node) => node.id);
    const seeds = [...roots, ...diagram.nodes.map((node) => node.id)];
    function assignLevel(nodeId, level, activePath) {
      if (activePath.has(nodeId) || (levels.has(nodeId) && levels.get(nodeId) >= level)) return;
      levels.set(nodeId, level);
      const nextPath = new Set(activePath);
      nextPath.add(nodeId);
      outgoing.get(nodeId).forEach((targetId) => assignLevel(targetId, level + 1, nextPath));
    }
    seeds.forEach((seedId) => {
      if (levels.has(seedId)) return;
      assignLevel(seedId, 0, new Set());
    });

    const columns = [];
    diagram.nodes.forEach((node) => {
      const level = levels.get(node.id);
      if (!columns[level]) columns[level] = [];
      columns[level].push(node);
    });

    const bounds = stage.getBoundingClientRect();
    const marginX = 44;
    const marginY = isFlowMode ? 8 : 36;
    const columnGap = isFlowMode ? 44 : 92;
    const rowGap = isFlowMode ? 62 : 34;
    const populatedColumns = columns.filter(Boolean).length;
    const availableFlowHeight = Math.max(NODE_H, bounds.height - marginY * 2 - NODE_H);
    const flowLevelGap = populatedColumns > 1
      ? Math.max(NODE_H + 4, Math.min(NODE_H + 36, availableFlowHeight / (populatedColumns - 1)))
      : 0;
    columns.forEach((column, columnIndex) => {
      if (!column) return;
      // Place related nodes near the vertical midpoint of their upstream links.
      column.sort((first, second) => {
        const midpoint = (node) => {
          const predecessors = incoming.get(node.id);
          if (!predecessors.length) return node.y;
          return predecessors.reduce((sum, nodeId) => sum + (nodeById(nodeId)?.y || 0), 0) / predecessors.length;
        };
        return midpoint(first) - midpoint(second);
      });
      const columnHeight = column.length * NODE_H + Math.max(0, column.length - 1) * rowGap;
      const startY = Math.max(marginY, (bounds.height - columnHeight) / 2);
      column.forEach((node, rowIndex) => {
        if (isFlowMode) {
          const usableWidth = Math.max(NODE_W, bounds.width - 16);
          const adaptiveGap = column.length > 1 ? Math.max(16, Math.min(columnGap, (usableWidth - column.length * NODE_W) / (column.length - 1))) : 0;
          const rowWidth = column.length * NODE_W + Math.max(0, column.length - 1) * adaptiveGap;
          const startX = Math.max(8, (bounds.width - rowWidth) / 2);
          node.x = Math.max(8, Math.min(bounds.width - NODE_W - 8, startX + rowIndex * (NODE_W + adaptiveGap)));
          node.y = marginY + columnIndex * flowLevelGap;
        } else {
          node.x = marginX + columnIndex * (NODE_W + columnGap);
          node.y = startY + rowIndex * (NODE_H + rowGap);
        }
      });
    });
    markDirty(message || (isFlowMode ? "Flow arranged" : "Architecture arranged"));
    render();
  }
  document.querySelector("#auto-layout").addEventListener("click", () => arrangeDiagram());
  function download(filename, content, type) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); URL.revokeObjectURL(link.href);
  }
  document.querySelector("#save-diagram").addEventListener("click", () => { download("arch-flow-diagram.json", JSON.stringify(diagram, null, 2), "application/json"); status.textContent = "JSON saved"; });
  document.querySelector("#load-diagram").addEventListener("click", () => document.querySelector("#load-input").click());
  function iconForDrawioCell(label, style) {
    const source = `${label} ${style}`.toLowerCase();
    const matchedAsset = assets.find((asset) => source.includes(asset.name.toLowerCase()));
    if (matchedAsset) return matchedAsset.icon;
    const keywords = [["kubernetes", "aks"], ["function", "functions"], ["virtualmachine", "vm"], ["database", "database"], ["server", "server"], ["cloud", "internet"], ["user", "user"]];
    const matchedKeyword = keywords.find(([keyword]) => source.includes(keyword));
    return matchedKeyword ? matchedKeyword[1] : "external";
  }
  function typeForDrawioCell(style) {
    const source = style.toLowerCase();
    if (source.includes("rhombus")) return "Decision";
    if (source.includes("parallelogram")) return "Input or output";
    if (source.includes("cylinder")) return "Data";
    if (source.includes("document")) return "Document";
    if (source.includes("ellipse")) return "Start";
    return isFlowMode ? "Process" : "Imported";
  }
  function cellLabel(cell) {
    const wrapper = cell.parentElement?.tagName === "object" ? cell.parentElement : null;
    const raw = wrapper?.getAttribute("label") || cell.getAttribute("value") || "Untitled asset";
    const holder = document.createElement("div");
    holder.innerHTML = raw.replace(/<br\s*\/?>/gi, " ");
    return (holder.textContent || "Untitled asset").trim().slice(0, 42);
  }
  async function inflateDrawio(content) {
    const encoded = decodeURIComponent(content.trim());
    const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    if (!window.DecompressionStream) throw new Error("Compressed draw.io files are not supported in this browser.");
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Response(stream).text();
  }
  async function drawioDocumentXml(content) {
    const parsed = new DOMParser().parseFromString(content, "text/xml");
    const diagramElement = parsed.querySelector("mxfile > diagram");
    if (!diagramElement) return content;
    const embeddedGraph = diagramElement.querySelector("mxGraphModel");
    return embeddedGraph ? embeddedGraph.outerHTML : inflateDrawio(diagramElement.textContent);
  }
  async function parseDrawioDiagram(content) {
    const xml = await drawioDocumentXml(content);
    const documentXml = new DOMParser().parseFromString(xml, "text/xml");
    if (documentXml.querySelector("parsererror")) throw new Error("Invalid draw.io XML");
    const cells = [...documentXml.querySelectorAll("mxCell")];
    const importedNodes = [];
    const idMap = new Map();
    cells.filter((cell) => cell.getAttribute("vertex") === "1").forEach((cell) => {
      const geometry = cell.querySelector(":scope > mxGeometry");
      if (!geometry) return;
      const label = cellLabel(cell);
      const style = cell.getAttribute("style") || "";
      const node = {
        id: uid(), label, type: typeForDrawioCell(style), icon: iconForDrawioCell(label, style), environment: "Production", notes: "Imported from draw.io",
        x: Math.max(8, Number(geometry.getAttribute("x")) || 40), y: Math.max(8, Number(geometry.getAttribute("y")) || 40)
      };
      importedNodes.push(node);
      idMap.set(cell.getAttribute("id"), node.id);
    });
    const importedEdges = cells.filter((cell) => cell.getAttribute("edge") === "1").map((cell) => ({
      id: uid(), from: idMap.get(cell.getAttribute("source")), to: idMap.get(cell.getAttribute("target"))
    })).filter((edge) => edge.from && edge.to);
    if (!importedNodes.length) throw new Error("No diagram assets were found");
    return { version: 1, nodes: importedNodes, edges: importedEdges };
  }
  document.querySelector("#load-input").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    try {
      const content = await file.text();
      const isNative = file.name.toLowerCase().endsWith(".json") || content.trim().startsWith("{");
      const next = isNative ? JSON.parse(content) : await parseDrawioDiagram(content);
      if (!Array.isArray(next.nodes) || !Array.isArray(next.edges)) throw new Error("Unsupported diagram structure");
      diagram = next;
      selectedId = null;
      selectedEdgeId = null;
      connectingFrom = null;
      connectingFromSide = null;
      connectingTo = null;
      markDirty(isNative ? "JSON diagram loaded" : "draw.io diagram imported");
      render();
    } catch (error) {
      status.textContent = error.message || "Unable to import this diagram";
    }
  });
  document.querySelector("#export-svg").addEventListener("click", () => {
    const width = Math.max(stage.clientWidth, 800); const height = Math.max(stage.clientHeight, 540);
    const edges = diagram.edges.map((edge) => {
      const source = nodeById(edge.from); const target = nodeById(edge.to);
      if (!source || !target) return "";
      const geometry = connectionGeometry(source, target, edge);
      const edgeLabel = edge.label ? `<text x="${geometry.labelX}" y="${geometry.labelY}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#315976" stroke="#f8fbfd" stroke-width="4" paint-order="stroke">${escapeHtml(edge.label)}</text>` : "";
      return `<path d="${geometry.path}" fill="none" stroke="#2a6b9d" stroke-width="2" marker-end="url(#arrowhead)"/>${edgeLabel}`;
    }).join("");
    const flowShapeSvg = (node) => {
      const shape = flowShapeFor(node.type);
      const common = `fill="#fff" stroke="#326a93" stroke-width="2"`;
      const shapes = {
        terminator: `<rect x="4" y="10" width="${NODE_W - 8}" height="${NODE_H - 20}" rx="${(NODE_H - 20) / 2}" ${common}/>` ,
        decision: `<polygon points="${NODE_W / 2},2 ${NODE_W - 24},${NODE_H / 2} ${NODE_W / 2},${NODE_H - 2} 24,${NODE_H / 2}" ${common}/>` ,
        "input-output": `<polygon points="18,10 ${NODE_W - 4},10 ${NODE_W - 18},${NODE_H - 10} 4,${NODE_H - 10}" ${common}/>` ,
        document: `<path d="M4 10 H${NODE_W - 4} V${NODE_H - 20} Q${NODE_W * .75} ${NODE_H} ${NODE_W / 2} ${NODE_H - 14} Q${NODE_W * .25} ${NODE_H - 28} 4 ${NODE_H - 16} Z" ${common}/>` ,
        data: `<rect x="4" y="10" width="${NODE_W - 8}" height="${NODE_H - 20}" rx="28" ${common}/>` ,
        loop: `<ellipse cx="${NODE_W / 2}" cy="${NODE_H / 2}" rx="${NODE_W / 2 - 4}" ry="${NODE_H / 2 - 10}" ${common}/>` ,
        merge: `<polygon points="4,10 ${NODE_W - 4},10 ${NODE_W / 2},${NODE_H - 8}" ${common}/>` ,
        subprocess: `<rect x="4" y="10" width="${NODE_W - 8}" height="${NODE_H - 20}" ${common}/><path d="M14 10 V${NODE_H - 10} M${NODE_W - 14} 10 V${NODE_H - 10}" stroke="#326a93" stroke-width="2"/>`
      };
      return shapes[shape] || `<rect x="4" y="10" width="${NODE_W - 8}" height="${NODE_H - 20}" rx="3" ${common}/>`;
    };
    const nodes = diagram.nodes.map((node) => isFlowMode
      ? `<g transform="translate(${node.x},${node.y})">${flowShapeSvg(node)}<text x="${NODE_W / 2}" y="${NODE_H / 2 + 4}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#142b42">${escapeHtml(node.label)}</text></g>`
      : `<g transform="translate(${node.x},${node.y})"><rect width="${NODE_W}" height="${NODE_H}" rx="6" fill="#fff" stroke="#8badc6"/><svg x="${(NODE_W - 34) / 2}" y="8" width="34" height="34" viewBox="0 0 32 32">${window.ArchIcons.inner(node.icon)}</svg><text x="${NODE_W / 2}" y="58" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#142b42">${escapeHtml(node.label)}</text></g>`).join("");
    download("arch-flow-diagram.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto" overflow="visible"><path d="M 0 0 L 8 4 L 0 8 z" fill="#2a6b9d"/></marker></defs><rect width="100%" height="100%" fill="#f8fbfd"/>${edges}${nodes}</svg>`, "image/svg+xml"); status.textContent = "SVG exported";
  });
  document.querySelector("#clear-diagram").addEventListener("click", () => { diagram = { version: 1, nodes: [], edges: [] }; selectedId = null; selectedEdgeId = null; connectingFrom = null; connectingFromSide = null; connectingTo = null; markDirty("Canvas cleared"); render(); });
  window.addEventListener("resize", renderConnections);
  renderPalette();
  render();
});