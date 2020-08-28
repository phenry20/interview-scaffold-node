const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser());

app.post("/asset", async (req, res) => {
  const { organizationId, assetType, assetUrl } = req.body;
  const result = await db.raw(
    `insert into assets (type, url, organization_id) values(${assetType}, '${assetUrl}', ${organizationId})` // parameterize
  );

  res.json(result.rows);
});

app.post("/assets/session", async (req, res) => {
  const { assetId, sessionId } = req.body;

  try {
    // delete if type already exists in session
    await db.raw(`with currentAsset as (select * from assets where id = ${assetId}),
currentSession as (select asset_sessions.id from asset_sessions
inner join assets a on asset_sessions.asset_id = a.id
inner join currentAsset ca on a.type = ca.type
where asset_sessions.session_id = ${sessionId})

delete from asset_sessions
where exists(select * from currentSession where currentSession.id = asset_sessions.id);`);

    const result = await db.raw(
      `insert into asset_sessions (asset_id, session_id) values(${assetId}, '${sessionId}')` // parameterize
    );

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

app.get("/session/:sessionId/assets", async (req, res) => {
  const { sessionId } = req.params;
  const result = await db.raw(
    `select assets.url from asset_sessions
inner join assets on asset_sessions.asset_id = assets.id
where session_id = ${sessionId}`
  );

  res.json(result.rows);
});

app.get("/assets/:organizationId", async (req, res) => {
  const { organizationId } = req.params;
  const result = await db.raw(
    `select * from assets where organization_id = ${organizationId}`
  );

  res.json(result.rows);
});

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
