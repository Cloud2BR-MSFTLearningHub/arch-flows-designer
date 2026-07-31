# Arch Flows Designer

Atlanta, USA

[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/)
[Cloud2BR OSS - Learning Hub](https://github.com/Cloud2BR-MSFTLearningHub)

Last updated: 2026-07-31

----------

<div class="designer-shell" id="designer" data-base-url="{{ base_url }}">
  <section class="designer-toolbar" aria-label="Diagram commands">
    <div class="designer-title"><span class="designer-mark">AF</span><div><strong>Architecture canvas</strong><span id="diagram-status">Draft</span></div></div>
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
      <label class="asset-search"><span>Search assets</span><input id="asset-search" type="search" placeholder="Service or asset"></label>
      <div id="asset-catalog"></div>
      <p class="asset-empty" id="catalog-empty" hidden>No assets match your search.</p>
      <p class="asset-hint">Select an asset to add it to the canvas.</p>
    </aside>
    <main class="diagram-stage" id="diagram-stage" aria-label="Diagram canvas">
      <svg class="connection-layer" id="connection-layer" aria-hidden="true"></svg>
      <div class="canvas-guide guide-one"></div><div class="canvas-guide guide-two"></div>
      <div class="canvas-empty" id="canvas-empty"><strong>Start with an Azure service</strong><span>Choose an asset from the catalog, then connect the flow.</span></div>
    </main>
    <aside class="inspector-panel" aria-label="Selection details">
      <div class="inspector-heading"><span>Properties</span><button id="delete-node" type="button" title="Delete selected asset">Delete</button></div>
      <div id="inspector-empty" class="inspector-empty">Select an asset on the canvas to edit its details.</div>
      <form id="node-form" hidden>
        <label>Label<input id="node-label" type="text" maxlength="42"></label>
        <label>Type<input id="node-type" type="text" readonly></label>
        <label>Environment<select id="node-environment"><option>Production</option><option>Staging</option><option>Development</option><option>Shared</option></select></label>
        <label>Notes<textarea id="node-notes" rows="4" maxlength="180" placeholder="Optional context"></textarea></label>
        <button class="connect-button" id="connect-node" type="button">Connect to another asset</button>
      </form>
    </aside>
  </div>
  <footer class="designer-footer"><span>Cloud2BR Microsoft Cloud Sandbox - Learning Hub</span><span id="selection-status">0 assets</span></footer>
</div>
