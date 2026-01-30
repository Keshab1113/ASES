const pool = require("../config/db");

exports.addVehicle = async (data) => {
  const { vehicle_number, vehicle_type, assigned_driver, fitness_expiry } = data;
  await pool.execute(
    `INSERT INTO vehicles (vehicle_number,vehicle_type,assigned_driver,fitness_expiry)
     VALUES (?,?,?,?)`,
    [vehicle_number, vehicle_type, assigned_driver, fitness_expiry]
  );
};

exports.getVehicles = async () => {
  const [rows] = await pool.execute("SELECT * FROM vehicles");
  return rows;
};

exports.createDriverProfile = async (data) => {
  const { user_id, license_number, license_expiry, experience_years } = data;
  await pool.execute(
    `INSERT INTO driver_profiles
     (user_id,license_number,license_expiry,experience_years)
     VALUES (?,?,?,?)`,
    [user_id, license_number, license_expiry, experience_years]
  );
};

exports.logTrip = async (data, userId) => {
  const { vehicle_id, start_location, end_location, start_time, end_time, distance_km } = data;
  await pool.execute(
    `INSERT INTO vehicle_trips
     (vehicle_id,driver_id,start_location,end_location,start_time,end_time,distance_km)
     VALUES (?,?,?,?,?,?,?)`,
    [vehicle_id, userId, start_location, end_location, start_time, end_time, distance_km]
  );
};

exports.reportIncident = async (data, userId) => {
  const { vehicle_id, incident_type, severity, description, incident_date } = data;

  let taskId = null;
  if (severity === "high") {
    const [task] = await pool.execute(
      `INSERT INTO tasks (task_type, priority, status)
       VALUES ('Vehicle Incident Action','high','open')`
    );
    taskId = task.insertId;
  }

  await pool.execute(
    `INSERT INTO vehicle_incidents
     (vehicle_id,driver_id,incident_type,severity,description,incident_date,linked_task_id)
     VALUES (?,?,?,?,?,?,?)`,
    [vehicle_id, userId, incident_type, severity, description, incident_date, taskId]
  );
};

exports.getAnalytics = async () => {
  const [[stats]] = await pool.execute(`
    SELECT
      COUNT(*) total_vehicles,
      SUM(fitness_expiry < CURDATE()) expired_fitness
    FROM vehicles
  `);

  const [[incidents]] = await pool.execute(`
    SELECT COUNT(*) accidents
    FROM vehicle_incidents
    WHERE incident_type='accident'
  `);

  return {
    vehicles: stats,
    accidents: incidents.accidents
  };
};
