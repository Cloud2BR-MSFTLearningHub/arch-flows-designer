# Architecture Designer

Atlanta, USA

[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/)
[Cloud2BR OSS - Learning Hub](https://github.com/Cloud2BR-MSFTLearningHub)

Last updated: 2026-07-31

----------

<div class="designer-shell" id="designer" data-mode="architecture">
  <section class="designer-toolbar" aria-label="Architecture diagram commands">
    <div class="designer-title"><span class="designer-mark">AZ</span><div><strong>Architecture canvas</strong><span id="diagram-status">Draft</span></div></div>
    <div class="toolbar-actions">
      <button class="tool-button" type="button" id="auto-layout">Arrange</button>
      <button class="tool-button" type="button" id="export-svg">Export SVG</button>
      <button class="tool-button" type="button" id="save-diagram">Save JSON</button>
      <button class="tool-button" type="button" id="load-diagram">Open diagram</button>
      <input id="load-input" type="file" accept="application/json,.json,.drawio,.dio,.xml,text/xml,application/xml" hidden>
      <button class="tool-button tool-button--danger" type="button" id="clear-diagram">Clear</button>
    </div>
  </section>
  <div class="designer-workspace">
    <aside class="asset-panel" aria-label="Architecture assets">
      <label class="asset-search"><span>Search Azure assets</span><input id="asset-search" type="search" placeholder="Service or asset"></label>
      <div id="asset-catalog"></div><p class="asset-empty" id="catalog-empty" hidden>No assets match your search.</p>
      <p class="asset-hint">Select an asset to add it to the canvas.</p>
    </aside>
    <main class="diagram-stage" id="diagram-stage" aria-label="Architecture canvas">
      <svg class="connection-layer" id="connection-layer" aria-hidden="true"></svg>
      <div class="canvas-empty" id="canvas-empty"><strong>Start with an Azure service</strong><span>Choose an asset from the catalog, then connect the architecture.</span></div>
    </main>
    <aside class="inspector-panel" aria-label="Selection details">
      <div class="inspector-heading"><span>Properties</span><button id="delete-node" type="button" title="Delete selected asset">Delete</button></div>
      <div id="inspector-empty" class="inspector-empty">Select an asset on the canvas to edit its details.</div>
      <form id="node-form" hidden>
        <label>Label<input id="node-label" type="text" maxlength="42"></label>
        <label>Type<input id="node-type" type="text" readonly></label>
        <label>Environment<select id="node-environment"><option>Production</option><option>Staging</option><option>Development</option><option>Shared</option></select></label>
        <label>Notes<textarea id="node-notes" rows="4" maxlength="180" placeholder="Optional context"></textarea></label>
        <button class="connect-button" id="connect-node" type="button">Connect from a point</button>
      </form>
      <form id="edge-form" hidden>
        <div class="edge-summary"><span id="edge-from-label"></span><span aria-hidden="true">&#8594;</span><span id="edge-to-label"></span></div>
        <label>Start point<select id="edge-from-side"><option value="">Auto</option><option value="top">Top</option><option value="right">Right</option><option value="bottom">Bottom</option><option value="left">Left</option></select></label>
        <label>End point<select id="edge-to-side"><option value="">Auto</option><option value="top">Top</option><option value="right">Right</option><option value="bottom">Bottom</option><option value="left">Left</option></select></label>
        <label>Arrow label<input id="edge-label" type="text" maxlength="28" placeholder="Optional label"></label>
        <button class="edge-action" id="reverse-edge" type="button">Reverse direction</button>
        <button class="edge-action edge-action--delete" id="delete-edge" type="button">Delete arrow</button>
      </form>
    </aside>
  </div>
  <footer class="designer-footer"><span>Cloud2BR Microsoft Cloud Sandbox - Learning Hub</span><span id="selection-status">0 assets</span></footer>
</div>
