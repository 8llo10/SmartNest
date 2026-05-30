import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Home, Users, Layers3, Lightbulb, ShieldCheck, Zap, Settings,
  Sofa, ChefHat, Trees, CloudFog, BedDouble, Car, Lock, Unlock,
  Thermometer, Camera, Fan, Droplets, DoorOpen, Bell, Search,
  Moon, Sun, UserRound, Power, Wifi, CloudRain, Snowflake, Wind
} from "lucide-react";
import "./App.css";

const floors = ["All", "Ground Floor", "First Floor", "Second Floor", "Rooftop", "Yard"];

const users = [
  ["Father", "Owner", true], ["Mother", "Admin", true], ["Ghala", "Admin", true],
  ["Rawan", "Member", true], ["Raghad", "Member", false], ["Jana", "Member", true],
  ["Guest 1", "Guest", false], ["Guest 2", "Guest", true],
];

const areas = [
  ["Men Majlis", "Ground Floor", Sofa, 8, "Guest Mode"],
  ["Women Majlis", "Ground Floor", Sofa, 7, "Warm Lights"],
  ["Family Majlis", "First Floor", Sofa, 10, "Comfort"],
  ["Outdoor Majlis", "Yard", Sofa, 6, "Evening"],
  ["Kitchen", "Ground Floor", ChefHat, 9, "Cooking"],
  ["Yard", "Yard", Trees, 11, "Garden"],
  ["Rooftop", "Rooftop", CloudFog, 5, "Relax"],
  ["Bedrooms", "Second Floor", BedDouble, 14, "Quiet"],
  ["Garage", "Ground Floor", Car, 4, "Secure"],
];

const devices = [
  ["Main Chandelier", "Men Majlis", "Ground Floor", Lightbulb, "78%", true],
  ["Kitchen AC", "Kitchen", "Ground Floor", Thermometer, "22°C", true],
  ["Front Door", "Entrance", "Ground Floor", Lock, "Secure", true],
  ["Yard Cameras", "Yard", "Yard", Camera, "Live", true],
  ["Water Sensor", "Kitchen", "Ground Floor", Droplets, "Normal", true],
  ["Rooftop Mist Fan", "Rooftop", "Rooftop", Fan, "45%", true],
  ["Women Majlis Lights", "Women Majlis", "Ground Floor", Lightbulb, "64%", true],
  ["Garage Door", "Garage", "Ground Floor", DoorOpen, "Closed", true],
  ["Bedroom AC", "Bedrooms", "Second Floor", Thermometer, "20°C", true],
];

function Stat({ icon: Icon, title, value, sub }) {
  return (
    <motion.div className="card stat" whileHover={{ y: -6 }}>
      <div className="icon"><Icon /></div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{sub}</span>
      </div>
    </motion.div>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    ["Dashboard", Home], ["Family", Users], ["Rooms", Layers3],
    ["Devices", Lightbulb], ["Security", ShieldCheck], ["Energy", Zap], ["Settings", Settings],
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brandIcon"><Home /></div>
          <div>
            <h1>SmartNest</h1>
          </div>
        </div>

        {items.map(([name, Icon]) => (
          <button key={name} onClick={() => setPage(name)} className={page === name ? "nav active" : "nav"}>
            <Icon size={20} /> {name}
          </button>
        ))}
      </div>

      <div className="calmBox">
        <CloudFog />
        <b>Calm Fog Mode</b>
        <p>Burgundy, purple and smoky gray theme.</p>
        <span><Wifi size={15} /> 52 devices online</span>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div>
        <h1>SmartNest Villa Control</h1>
        <p>3 floors, rooftop, yard, kitchen, 4 majlis areas, and 8 home users.</p>
      </div>
      <div className="search">
        <Search size={18} />
        <input placeholder="Search room, user, device..." />
        <button><Bell size={18} /></button>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <div className="stats">
        <Stat icon={Users} title="Home Users" value="8" sub="5 active now" />
        <Stat icon={Layers3} title="Villa Levels" value="5" sub="3 floors + rooftop + yard" />
        <Stat icon={Lightbulb} title="Smart Devices" value="52" sub="Across all areas" />
        <Stat icon={ShieldCheck} title="Security" value="Safe" sub="Doors locked, cameras live" />
      </div>

      <div className="grid2">
        <section className="card">
          <h2>Villa Quick Control</h2>
          <p className="muted">Most used devices in kitchen, majlis, yard, rooftop and bedrooms.</p>
          <div className="deviceGrid">
            {devices.slice(0, 4).map((d) => <DeviceCard key={d[0]} data={d} />)}
          </div>
        </section>

        <section className="card">
          <h2>Comfort Scenes</h2>
          <Scene icon={Sun} title="Morning House" text="Kitchen lights, curtains, AC 23°C" />
          <Scene icon={Sofa} title="Majlis Guests" text="Turn on 4 majlis areas" />
          <Scene icon={Moon} title="Night Calm" text="Lock doors and dim lights" />
          <Scene icon={CloudFog} title="Foggy Rooftop" text="Mist fans and purple lights" />
        </section>
      </div>
    </div>
  );
}

function Scene({ icon: Icon, title, text }) {
  return (
    <motion.div className="scene" whileHover={{ x: 5 }}>
      <div className="smallIcon"><Icon /></div>
      <div><b>{title}</b><p>{text}</p></div>
    </motion.div>
  );
}

function Family() {
  return (
    <div className="cards4">
      {users.map(([name, role, active]) => (
        <motion.div className="card userCard" key={name} whileHover={{ y: -6 }}>
          <div className="userTop">
            <div className="avatar"><UserRound /></div>
            <span className={active ? "online" : "away"}>{active ? "Home" : "Away"}</span>
          </div>
          <h2>{name}</h2>
          <p>{role}</p>
          <button className="outline">Manage Access</button>
        </motion.div>
      ))}
    </div>
  );
}

function Rooms() {
  return (
    <div className="cards3">
      {areas.map(([name, floor, Icon, count, mood]) => (
        <motion.div className="card roomCard" key={name} whileHover={{ y: -6 }}>
          <div className="roomTop">
            <div className="smallIcon"><Icon /></div>
            <span>{count} devices</span>
          </div>
          <h2>{name}</h2>
          <p>{floor} • {mood}</p>
        </motion.div>
      ))}
    </div>
  );
}

function DeviceCard({ data }) {
  const [name, area, floor, Icon, value, online] = data;
  const [on, setOn] = useState(true);

  return (
    <motion.div className="device" whileHover={{ y: -5 }}>
      <div className="deviceTop">
        <div className="icon"><Icon /></div>
        <button onClick={() => setOn(!on)} className={on ? "switch on" : "switch"}>
          <span />
        </button>
      </div>
      <h3>{name}</h3>
      <p>{area} • {floor}</p>
      <h2>{on ? value : "Off"}</h2>
      <span className={online ? "onlineText" : "offlineText"}>{online ? "Online" : "Offline"}</span>
    </motion.div>
  );
}

function Devices() {
  const [floor, setFloor] = useState("All");
  const filtered = useMemo(() => floor === "All" ? devices : devices.filter(d => d[2] === floor), [floor]);

  return (
    <div>
      <div className="filters">
        {floors.map(f => <button key={f} onClick={() => setFloor(f)} className={floor === f ? "filter activeFilter" : "filter"}>{f}</button>)}
      </div>
      <div className="cards3">
        {filtered.map(d => <DeviceCard key={d[0]} data={d} />)}
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="grid2">
      <section className="card">
        <h2>Security Cameras</h2>
        <p className="muted">Entrance, yard, garage, rooftop and majlis access.</p>
        <div className="cameraGrid">
          {["Main Entrance", "Yard", "Garage", "Rooftop"].map(cam => (
            <div className="cameraBox" key={cam}>
              <span>LIVE</span>
              <b>{cam}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Smart Locks</h2>
        {["Front Door", "Back Door", "Garage Door", "Rooftop Door"].map((lock, i) => (
          <div className="lockItem" key={lock}>
            {i === 2 ? <Unlock /> : <Lock />}
            <div><b>{lock}</b><p>{i === 2 ? "Unlocked" : "Locked"}</p></div>
            <Power size={18} />
          </div>
        ))}
      </section>
    </div>
  );
}

function Energy() {
  const bars = [35, 55, 42, 68, 80, 61, 73];
  return (
    <div className="grid2">
      <section className="card">
        <h2>Weekly Villa Energy</h2>
        <p className="muted">Usage for AC, lights, yard, rooftop and kitchen.</p>
        <div className="bars">
          {bars.map((h, i) => <motion.div key={i} className="bar" initial={{ height: 0 }} animate={{ height: `${h}%` }} />)}
        </div>
      </section>
      <div className="energyStats">
        <Stat icon={Zap} title="Current Load" value="6.8kW" sub="Large villa usage" />
        <Stat icon={BatteryIcon} title="Saved" value="14%" sub="Automation saving" />
        <Stat icon={Power} title="Standby" value="11" sub="Can be turned off" />
      </div>
    </div>
  );
}

function BatteryIcon() {
  return <Zap />;
}

function SettingsPage() {
  const settings = [
    ["House Type", "3 floors + rooftop + yard"],
    ["Users", "8 family users with roles"],
    ["Main Areas", "Kitchen, yard, rooftop, 4 majlis, bedrooms, garage"],
    ["Theme", "Burgundy, purple, smoky gray"],
    ["Animation", "Calm fog motion enabled"],
  ];

  return (
    <section className="card settingsCard">
      <h2>Villa Settings</h2>
      {settings.map(([a, b]) => (
        <div className="setting" key={a}>
          <div><b>{a}</b><p>{b}</p></div>
          <button className="outline">Edit</button>
        </div>
      ))}
    </section>
  );
}

function WeatherAtmosphere({ weather }) {
  return (
    <div className={`weatherLayer ${weather}`}>
      <div className="fog fog1" />
      <div className="fog fog2" />
      <div className="fog fog3" />

      {weather === "winter" && (
        <>
          <div className="snow snow1" />
          <div className="snow snow2" />
          <div className="snow snow3" />
        </>
      )}

      {weather === "rain" && (
        <>
          <div className="rain rain1" />
          <div className="rain rain2" />
        </>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState("winter");

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <WeatherAtmosphere weather={weather} />

      <Sidebar page={page} setPage={setPage} />

      <main className="main">
        <div className="themeToggle">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <Header />

        <div className="weatherControls">
          <button onClick={() => setWeather("winter")}>
            <Snowflake size={16} /> Winter Fog
          </button>

          <button onClick={() => setWeather("rain")}>
            <CloudRain size={16} /> Rain Mode
          </button>

          <button onClick={() => setWeather("calm")}>
            <Wind size={16} /> Calm Smoke
          </button>
        </div>
        {page === "Dashboard" && <Dashboard />}
        {page === "Family" && <Family />}
        {page === "Rooms" && <Rooms />}
        {page === "Devices" && <Devices />}
        {page === "Security" && <Security />}
        {page === "Energy" && <Energy />}
        {page === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
}