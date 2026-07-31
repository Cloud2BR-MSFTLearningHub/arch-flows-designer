# Flow Designer

Atlanta, USA

[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/)
[Cloud2BR OSS - Learning Hub](https://github.com/Cloud2BR-MSFTLearningHub)

Last updated: 2026-07-31

----------

<div class="designer-shell" id="designer" data-mode="flow">
  <section class="designer-toolbar" aria-label="Flow diagram commands">
    <div class="designer-title"><span class="designer-mark">FL</span><div><strong>Flow canvas</strong><span id="diagram-status">Draft</span></div></div>
    <div class="toolbar-actions">
      <button class="tool-button" type="button" id="auto-layout">Arrange</button>
      <button class="tool-button" type="button" id="export-svg">Export SVG</button>
      <button class="tool-button" type="button" id="save-diagram">Save JSON</button>
      <button class="tool-button" type="button" id="load-diagram">Open diagram</button>
      <input id="load-input" type="file" accept="application/json,.json,.drawio,.dio,.xml,text/xml,application/xml" hidden>
      <button class="tool-button tool-button--danger" type="button" id="clear-diagram">Clear</button>
    </div>
  </section>
  <section class="template-shelf" aria-label="Flow templates">
    <div class="template-shelf__label"><strong>Templates</strong><span>Start with a structure, then edit every step.</span></div>
    <div class="template-list">
      <button class="template-button" type="button" data-template="algorithm"><span>Algorithm</span><small>Input, loop, decision, output</small></button>
      <button class="template-button" type="button" data-template="approval"><span>Approval process</span><small>Request, review, decision, notify</small></button>
      <button class="template-button" type="button" data-template="presentation"><span>Presentation flow</span><small>Context, insight, recommendation, action</small></button>
      <button class="template-button" type="button" data-template="incident"><span>Incident response</span><small>Alert, triage, contain, close</small></button>
    </div>
  </section>
  <div class="designer-workspace">
    <aside class="asset-panel" aria-label="Flowchart symbols">
      <label class="asset-search"><span>Search flow symbols</span><input id="asset-search" type="search" placeholder="Step or symbol"></label>
      <div id="asset-catalog"></div><p class="asset-empty" id="catalog-empty" hidden>No symbols match your search.</p>
      <p class="asset-hint">Select a symbol to add it to the flow.</p>
    </aside>
    <main class="diagram-stage" id="diagram-stage" aria-label="Flow canvas">
      <svg class="connection-layer" id="connection-layer" aria-hidden="true"></svg>
      <div class="canvas-empty" id="canvas-empty"><strong>Start with a flow symbol</strong><span>Add a start point, process, or decision, then connect the sequence.</span></div>
    </main>
    <aside class="inspector-panel" aria-label="Selection details">
      <div class="inspector-heading"><span>Properties</span><button id="delete-node" type="button" title="Delete selected symbol">Delete</button></div>
      <div id="inspector-empty" class="inspector-empty">Select a symbol on the canvas to edit its details.</div>
      <form id="node-form" hidden>
        <label>Label<input id="node-label" type="text" maxlength="42"></label>
        <label>Type<input id="node-type" type="text" readonly></label>
        <label>Environment<select id="node-environment"><option>Production</option><option>Staging</option><option>Development</option><option>Shared</option></select></label>
        <label>Notes<textarea id="node-notes" rows="4" maxlength="180" placeholder="Optional context"></textarea></label>
        <button class="connect-button" id="connect-node" type="button">Connect to next step</button>
      </form>
    </aside>
  </div>
  <footer class="designer-footer"><span>Cloud2BR Microsoft Cloud Sandbox - Learning Hub</span><span id="selection-status">0 symbols</span></footer>
</div>
