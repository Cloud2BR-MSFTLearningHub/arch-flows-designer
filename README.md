# Arch Flows Designer

Atlanta, USA

[![GitHub](https://img.shields.io/badge/--181717?logo=github&logoColor=ffffff)](https://github.com/)
[Cloud2BR OSS - Learning Hub](https://github.com/Cloud2BR-MSFTLearningHub)

Last updated: 2026-07-31

----------

Draw Azure cloud architecture diagrams, service flows, and infrastructure
topologies directly in the browser. The editor is a lightweight Cloud2BR learning
sandbox for exploring solution designs and producing portable diagram artifacts.

**Live designer:** https://cloud2br-msftlearninghub.github.io/arch-flows-designer/

## Features

- Browse and search an Azure service catalog covering compute, networking, data,
  integration, security, AI, monitoring, and general infrastructure assets.
- Use recognizable Azure service icons for Azure resources and simple icons for
  general architecture elements such as users, on-premises systems, and trust
  boundaries.
- Add, select, move, label, connect, and remove diagram nodes on a grid canvas.
- Arrange connected nodes by dependency flow, from source assets on the left to
  dependent assets on the right.
- Save and reopen the portable native JSON diagram format.
- Import standard draw.io `.drawio`, `.dio`, and `.xml` diagrams, including
  compressed `mxfile` documents. Imported nodes preserve labels, positions, and
  valid connectors.
- Export the current canvas as SVG for documentation and presentations.

## Use the Designer

1. Select an asset from the left catalog to add it to the canvas.
2. Select a canvas node, edit its label or details in **Properties**, and choose
   **Connect to another asset** to create a flow.
3. Use **Arrange** to lay out connected assets in their flow direction.
4. Choose **Open diagram** to import a native JSON or draw.io file, or **Save
   JSON** and **Export SVG** to share the result.

## Run Locally

The GitHub Pages site is built with MkDocs Material.

```powershell
python -m pip install -r requirements.txt
python -m mkdocs serve
```

Open `http://127.0.0.1:8000/` in a browser. Build the deployable static site
with:

```powershell
python -m mkdocs build --strict
```

## Project Structure

| Path | Purpose |
| --- | --- |
| `docs/index.md` | GitHub Pages designer interface |
| `docs/assets/js/designer.js` | Canvas interactions, layout, import, and export behavior |
| `docs/assets/js/icons.js` | Azure and general asset icon rendering |
| `docs/assets/css/custom.css` | Cloud2BR theme and designer layout styles |
| `mkdocs.yml` | GitHub Pages and MkDocs configuration |

## Diagram Compatibility

Native diagrams use JSON with `nodes` and `edges` collections. draw.io imports
support standard `mxGraphModel` XML, direct draw.io XML, and compressed diagrams
stored in an `mxfile`. Complex draw.io styling, containers, and custom shapes are
imported as individual nodes where possible; their visual styling is not carried
over to the Azure-focused canvas.

## Icons

Azure service icons are referenced from the public
[benc-uk/icon-collection](https://github.com/benc-uk/icon-collection) CDN
collection. Generic architecture elements use local inline vector icons.

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).
See the license file for the complete terms.

<!-- START BADGE -->
<div align="center">
  <img src="https://img.shields.io/badge/Total%20views-40-limegreen" alt="Total views">
  <p>Refresh Date: 2026-04-07</p>
</div>
<!-- END BADGE -->
