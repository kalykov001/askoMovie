"use client";
import { useRouter } from "next/navigation";
import scss from "./header.module.scss";
import { CiSearch } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const { push } = useRouter();
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) {
      push(`/search?query=${searchText}`);
      setOpenSearch(false);
      setOpenMenu(false);
      setSearchText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const navigate = (path: string) => {
    push(path);
    setOpenMenu(false);
  };

  return (
    <header className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div onClick={() => navigate("/")} className={scss.startHeader}>
            <img
              src="https://movie.elcho.dev/assets/eco-movie-logo-a8_bjuTM.svg"
              alt="AskoMovie logo"
            />
            <h2>AskoMovie</h2>
          </div>

          <nav className={scss.nav}>
            <p onClick={() => navigate("/movies")}>Movies</p>
            <p onClick={() => navigate("/tv")}>TV Shows</p>
            <span onClick={() => { setOpenSearch((v) => !v); setOpenMenu(false); }}>
              <CiSearch />
            </span>
          </nav>

          <button
            className={scss.burger}
            onClick={() => { setOpenMenu((v) => !v); setOpenSearch(false); }}
            aria-label="Toggle menu"
          >
            {openMenu ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {openSearch && (
        <div className={scss.headerSearch}>
          <div className="container">
            <div className={scss.searchInner}>
              <input
                autoFocus
                type="text"
                placeholder="Search for a movie or tv show..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className={scss.cancelOrSearch}>
                <button onClick={handleSearch}>Search</button>
                <button onClick={() => setOpenSearch(false)} className={scss.cancel}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openMenu && (
        <div className={scss.mobileMenu}>
          <p onClick={() => navigate("/movies")}>Movies</p>
          <p onClick={() => navigate("/tv")}>TV Shows</p>
          <div className={scss.mobileSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
