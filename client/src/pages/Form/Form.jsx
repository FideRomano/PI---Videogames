import { useState } from "react";
import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    genres: [],
    released: "",
    rating: "",
    platforms: [],
  });

  const platf = [
    "PC",
    "PlayStation 5",
    "PlayStation 4",
    "Xbox One",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "Web",
  ];
  const gen = [
    "Action",
    "Indie",
    "Adventure",
    "RPG",
    "Strategy",
    "Shooter",
    "Casual",
    "Simulation",
    "Puzzle",
    "Arcade",
    "Platformer",
    "Racing",
    "Massively Multiplayer",
    "Sports",
    "Fighting",
    "Family",
    "Board Games",
    "Educational",
    "Card",
  ];

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/videogames", form);
  };

  function handleSelectP(event) {
    if (
      event.target.value !== "platforms" &&
      !form.platforms.includes(event.target.value)
    )
      setForm({
        ...form,
        platforms: [...form.platforms, event.target.value],
      });
  }

  function handleDeleteP(event) {
    setForm({
      ...form,
      platforms: form.platforms.filter(
        (element) => element !== event.target.value
      ),
    });
  }

  function handleSelectG(event) {
    if (
      event.target.value !== "platforms" &&
      !form.genres.includes(event.target.value)
    )
      setForm({
        ...form,
        genres: [...form.genres, event.target.value],
      });
  }

  function handleDeleteG(event) {
    setForm({
      ...form,
      genres: form.genres.filter((element) => element !== event.target.value),
    });
  }

  return (
    <form onSubmit={submitHandler} className={style.container}>
      <div>
        {/* <label>Name: </label> */}
        <input
          className={style.input}
          type="text"
          value={form.name}
          onChange={changeHandler}
          name="name"
          placeholder="Name"
        />
      </div>

      <div>
        {/* <label>Description: </label> */}
        <input
          className={style.input}
          type="text"
          value={form.description}
          onChange={changeHandler}
          name="description"
          placeholder="Description"
        />
      </div>

      {/* <label>Genres: </label> */}
      <select name="genres" onChange={handleSelectG}>
        <option value="genres" className={style.genres}>Genres</option>
        {gen?.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </select>
      <div>
        {form.genres?.map((element, index) => (
          <span key={index}>
            {element}
            <button value={element} onClick={handleDeleteG}>
              X
            </button>
          </span>
        ))}
      </div>

      <div>
        {/* <label>Released: </label> */}
        <input
          className={style.input}
          type="text"
          value={form.released}
          onChange={changeHandler}
          name="released"
          placeholder="Released"
        />
      </div>

      <div>
        {/* <label>Rating: </label> */}
        <input
          className={style.input}
          type="text"
          value={form.rating}
          onChange={changeHandler}
          name="rating"
          placeholder="Rating"
        />
      </div>

      {/* <label>Platforms: </label> */}
      <select name="platforms" onChange={handleSelectP}>
        <option value="platforms" className={style.genres}>Platforms</option>
        {platf?.map((element, index) => (
          <option key={index}>{element}</option>
        ))}
      </select>
      <div>
        {form.platforms?.map((element, index) => (
          <span key={index}>
            {element}
            <button value={element} onClick={handleDeleteP}>
              X
            </button>
          </span>
        ))}
      </div>

      <div>

        <input
          className={style.input}
          type="text"
          value={form.background_image}
          onChange={changeHandler}
          name="background_image"
          placeholder="Imagen"
        />
      </div>
      

      <button className={style.submit} type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default Form;
