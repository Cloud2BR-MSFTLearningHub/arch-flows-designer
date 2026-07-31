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
  const inspectorEmpty = document.querySelector("#inspector-empty");
  const labelInput = document.querySelector("#node-label");
  const typeInput = document.querySelector("#node-type");
  const environmentInput = document.querySelector("#node-environment");
  const notesInput = document.querySelector("#node-notes");
  let diagram = { version: 1, nodes: [], edges: [] };
  let selectedId = null;
  let connectingFrom = null;
  let drag = null;
  const NODE_W = isFlowMode ? 136 : 120;
  const NODE_H = isFlowMode ? 96 : 116;

  function uid() { return `node-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
  function nodeById(id) { return diagram.nodes.find((node) => node.id === id); }
  function markDirty(message = "Unsaved changes") { status.textContent = message; }
  function flowNode(label, type, icon, x, y) { return { id: uid(), label, type, icon, environment: "Production", notes: "", x, y }; }
  const flowTemplates = {
    algorithm: { nodes: [
      ["Start", "Start", "flowstart"], ["Read input", "Input or output", "flowinput"], ["More items?", "Decision", "flowdecision"], ["Process next item", "Process", "flowprocess"], ["Show result", "Input or output", "flowinput"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3, "Yes"], [2, 4, "No"], [3, 2, "Next item"], [4, 5]], positions: [[0, 8], [0, 92], [0, 176], [-160, 260], [160, 260], [160, 344]] },
    approval: { nodes: [
      ["Start", "Start", "flowstart"], ["Submit request", "Process", "flowprocess"], ["Review request", "Task", "flowtask"], ["Approved?", "Decision", "flowdecision"], ["Notify requester", "Message", "queue"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3], [3, 4, "Yes / No"], [4, 5]], positions: [[0, 8], [0, 90], [0, 172], [0, 254], [0, 336], [0, 418]] },
    presentation: { nodes: [
      ["Start", "Start", "flowstart"], ["Set the context", "Process", "flowprocess"], ["Present the insight", "Document", "flowdocument"], ["Make the recommendation", "Approval", "flowapproval"], ["End", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3], [3, 4]], positions: [[0, 8], [0, 108], [0, 208], [0, 308], [0, 408]] },
    incident: { nodes: [
      ["Alert received", "Start", "flowstart"], ["Triage incident", "Process", "flowprocess"], ["Service impacted?", "Decision", "flowdecision"], ["Contain and recover", "Subprocess", "flowsubprocess"], ["Record outcome", "Document", "flowdocument"], ["Close incident", "End", "flowend"]
    ], edges: [[0, 1], [1, 2], [2, 3, "Yes"], [2, 4, "No"], [3, 4], [4, 5]], positions: [[0, 8], [0, 92], [0, 176], [-160, 260], [160, 260], [160, 344]] }
  };
  function applyFlowTemplate(templateName) {
    const template = flowTemplates[templateName];
    if (!template) return;
    const stageWidth = Math.max(stage.clientWidth, NODE_W + 16);
    const centerX = stageWidth / 2 - NODE_W / 2;
    diagram = { version: 1, nodes: template.nodes.map(([label, type, icon], index) => {
      const [offsetX, y] = template.positions?.[index] || [0, 8 + index * 84];
      const x = Math.min(stageWidth - NODE_W - 8, Math.max(8, centerX + offsetX));
      return flowNode(label, type, icon, x, y);
    }), edges: [] };
    template.edges.forEach(([from, to, label]) => diagram.edges.push({ id: uid(), from: diagram.nodes[from].id, to: diagram.nodes[to].id, label }));
    selectedId = diagram.nodes[0].id;
    connectingFrom = null;
    markDirty("Template loaded - edit any step");
    render();
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
    markDirty();
    render();
  }
  function render() {
    stage.querySelectorAll(".architecture-node").forEach((element) => element.remove());
    empty.hidden = diagram.nodes.length > 0;
    diagram.nodes.forEach((node) => {
      const element = document.createElement("article");
      const shape = isFlowMode ? flowShapeFor(node.type) : "asset";
      element.className = `architecture-node${isFlowMode ? ` flow-node flow-node--${shape}` : ""}${node.id === selectedId ? " is-selected" : ""}${connectingFrom && node.id !== connectingFrom ? " is-connect-target" : ""}`;
      element.dataset.nodeId = node.id;
      element.style.left = `${node.x}px`;
      element.style.top = `${node.y}px`;
      element.innerHTML = isFlowMode
        ? `<span class="flow-node__port flow-node__port--in" aria-hidden="true"></span><span class="flow-node__content"><span class="flow-node__type">${escapeHtml(node.type)}</span><span class="node-label">${escapeHtml(node.label)}</span></span><span class="flow-node__port flow-node__port--out" aria-hidden="true"></span>`
        : `<span class="node-icon">${window.ArchIcons.svg(node.icon, 48)}</span><span class="node-label">${escapeHtml(node.label)}</span>`;
      element.addEventListener("pointerdown", beginDrag);
      element.addEventListener("click", selectNode);
      stage.append(element);
    });
    renderConnections();
    renderInspector();
    selectionStatus.textContent = `${diagram.nodes.length} ${diagram.nodes.length === 1 ? unitNoun : `${unitNoun}s`}`;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]); }
  function flowShapeFor(type) {
    const shapes = {
      "Start": "terminator", "End": "terminator", "Decision": "decision", "Input or output": "input-output",
      "Document": "document", "Data": "data", "Subprocess": "subprocess", "Loop": "loop", "Merge": "merge"
    };
    return shapes[type] || "process";
  }
  function renderConnections() {
    const bounds = stage.getBoundingClientRect();
    lines.innerHTML = `<defs><marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z" fill="#2a6b9d"/></marker></defs>`;
    lines.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    diagram.edges.forEach((edge) => {
      const source = nodeById(edge.from);
      const target = nodeById(edge.to);
      if (!source || !target) return;
      const startX = isFlowMode ? source.x + NODE_W / 2 : source.x + NODE_W;
      const startY = isFlowMode ? source.y + NODE_H : source.y + NODE_H / 2;
      const endX = isFlowMode ? target.x + NODE_W / 2 : target.x;
      const endY = isFlowMode ? target.y : target.y + NODE_H / 2;
      const bend = Math.max(35, isFlowMode ? Math.abs(endY - startY) / 2 : Math.abs(endX - startX) / 2);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", isFlowMode ? `M ${startX} ${startY} C ${startX} ${startY + bend}, ${endX} ${endY - bend}, ${endX} ${endY}` : `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`);
      path.setAttribute("marker-end", "url(#flow-arrow)");
      lines.append(path);
      if (edge.label) {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", String((startX + endX) / 2));
        label.setAttribute("y", String((startY + endY) / 2 - 6));
        label.setAttribute("text-anchor", "middle");
        label.textContent = edge.label;
        lines.append(label);
      }
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
    status.textContent = isFlowMode ? "Select the next step" : "Select the target asset";
    render();
  });
  document.querySelector("#delete-node").addEventListener("click", () => {
    if (!selectedId) return;
    diagram.nodes = diagram.nodes.filter((node) => node.id !== selectedId);
    diagram.edges = diagram.edges.filter((edge) => edge.from !== selectedId && edge.to !== selectedId);
    selectedId = null;
    connectingFrom = null;
    markDirty(`${isFlowMode ? "Symbol" : "Asset"} deleted`);
    render();
  });
  stage.addEventListener("click", () => { if (!connectingFrom) { selectedId = null; render(); } });
  document.querySelector("#asset-search").addEventListener("input", (event) => renderPalette(event.target.value));
  document.querySelectorAll("[data-template]").forEach((button) => button.addEventListener("click", () => applyFlowTemplate(button.dataset.template)));
  function arrangeDiagram() {
    if (!diagram.nodes.length) return;

    const nodeIds = new Set(diagram.nodes.map((node) => node.id));
    const incoming = new Map(diagram.nodes.map((node) => [node.id, []]));
    const outgoing = new Map(diagram.nodes.map((node) => [node.id, []]));
    diagram.edges.forEach((edge) => {
      if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to) || edge.from === edge.to) return;
      outgoing.get(edge.from).push(edge.to);
      incoming.get(edge.to).push(edge.from);
    });

    // Assign each node to the first column after all of its prerequisites.
    const remaining = new Map(diagram.nodes.map((node) => [node.id, incoming.get(node.id).length]));
    const levels = new Map();
    const queue = diagram.nodes.filter((node) => remaining.get(node.id) === 0).map((node) => node.id);
    queue.forEach((nodeId) => levels.set(nodeId, 0));
    for (let index = 0; index < queue.length; index += 1) {
      const nodeId = queue[index];
      outgoing.get(nodeId).forEach((targetId) => {
        levels.set(targetId, Math.max(levels.get(targetId) || 0, (levels.get(nodeId) || 0) + 1));
        remaining.set(targetId, remaining.get(targetId) - 1);
        if (remaining.get(targetId) === 0) queue.push(targetId);
      });
    }

    // Cyclic diagrams have no natural source; keep their connected nodes together.
    diagram.nodes.forEach((node) => {
      if (!levels.has(node.id)) {
        const predecessorLevels = incoming.get(node.id).map((nodeId) => levels.get(nodeId)).filter((level) => level !== undefined);
        levels.set(node.id, predecessorLevels.length ? Math.max(...predecessorLevels) + 1 : 0);
      }
    });

    const columns = [];
    diagram.nodes.forEach((node) => {
      const level = levels.get(node.id);
      if (!columns[level]) columns[level] = [];
      columns[level].push(node);
    });

    const bounds = stage.getBoundingClientRect();
    const marginX = 44;
    const marginY = isFlowMode ? 16 : 36;
    const columnGap = isFlowMode ? 44 : 92;
    const rowGap = isFlowMode ? 62 : 34;
    const populatedColumns = columns.filter(Boolean).length;
    const availableFlowHeight = Math.max(NODE_H, bounds.height - marginY * 2 - NODE_H);
    const flowLevelGap = populatedColumns > 1
      ? Math.max(76, Math.min(NODE_H + 34, availableFlowHeight / (populatedColumns - 1)))
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
          const rowWidth = column.length * NODE_W + Math.max(0, column.length - 1) * columnGap;
          const startX = Math.max(8, (bounds.width - rowWidth) / 2);
          node.x = Math.min(bounds.width - NODE_W - 8, startX + rowIndex * (NODE_W + columnGap));
          node.y = marginY + columnIndex * flowLevelGap;
        } else {
          node.x = marginX + columnIndex * (NODE_W + columnGap);
          node.y = startY + rowIndex * (NODE_H + rowGap);
        }
      });
    });
    markDirty(isFlowMode ? "Flow arranged" : "Architecture arranged");
    render();
  }
  document.querySelector("#auto-layout").addEventListener("click", arrangeDiagram);
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
      connectingFrom = null;
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
      const startX = isFlowMode ? source.x + NODE_W / 2 : source.x + NODE_W;
      const startY = isFlowMode ? source.y + NODE_H : source.y + NODE_H / 2;
      const endX = isFlowMode ? target.x + NODE_W / 2 : target.x;
      const endY = isFlowMode ? target.y : target.y + NODE_H / 2;
      const bend = Math.max(35, isFlowMode ? Math.abs(endY - startY) / 2 : Math.abs(endX - startX) / 2);
      const path = isFlowMode ? `M ${startX} ${startY} C ${startX} ${startY + bend}, ${endX} ${endY - bend}, ${endX} ${endY}` : `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`;
      const edgeLabel = edge.label ? `<text x="${(startX + endX) / 2}" y="${(startY + endY) / 2 - 6}" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#315976" stroke="#f8fbfd" stroke-width="4" paint-order="stroke">${escapeHtml(edge.label)}</text>` : "";
      return `<path d="${path}" fill="none" stroke="#2a6b9d" stroke-width="2" marker-end="url(#arrowhead)"/>${edgeLabel}`;
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
    download("arch-flow-diagram.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z" fill="#2a6b9d"/></marker></defs><rect width="100%" height="100%" fill="#f8fbfd"/>${edges}${nodes}</svg>`, "image/svg+xml"); status.textContent = "SVG exported";
  });
  document.querySelector("#clear-diagram").addEventListener("click", () => { diagram = { version: 1, nodes: [], edges: [] }; selectedId = null; connectingFrom = null; markDirty("Canvas cleared"); render(); });
  window.addEventListener("resize", renderConnections);
  renderPalette();
  render();
});