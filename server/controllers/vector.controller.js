const pool = require("../config/db");
const { generateEmbedding } = require("../services/vector.service");

exports.storeVector = async (resourceId, text, meta) => {
  const embedding = await generateEmbedding(text);

  await pool.execute(
    `INSERT INTO vector_memory 
     (resource_id, embedding, indicator_type, category)
     VALUES (?,?,?,?)`,
    [resourceId, JSON.stringify(embedding), meta.indicator_type, meta.category]
  );
};
