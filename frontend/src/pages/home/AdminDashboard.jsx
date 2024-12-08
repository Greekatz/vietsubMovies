/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../components-main/header/Header";
import "./AdminDashboard.css";
import MovieCard from "../../components-main/movie-card/MovieCard";
import { useGetAllMovies } from "../../hooks/getTrendingContent";
import axios from "axios";
import toast from "react-hot-toast";
const AdminDashboard = () => {
    const { allMovies, setAllMovies } = useGetAllMovies(); // Assuming useGetAllMovies provides a state setter for allMovies

    const handleReleased = async (movieID) => {
      try {
        // Make the API call to toggle release status
        const response = await axios.get(`/api/movie/${movieID}/toggleRelease`);
        console.log(response)
        const updatedMovie = response.data.content; // The updated movie from the response
  
        // Update the corresponding movie in the allMovies array
        setAllMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie._id === updatedMovie._id ? { ...movie, isPublished: updatedMovie.isPublished } : movie
          )
        );
  
        toast.success("Update successfully!");
      } catch (err) {
        toast.error(err.response?.data.message || "Update failed!");
      }
    };
  
    if (!allMovies) {
      return (
        <>
          <Header />
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
        </>
      );
    }
  return (
    <>
      <Header />
      <div className="search-movie-list">
        {allMovies.map((movie) => (
          <div className="movieCard" key={movie.id}>
            <MovieCard item={movie} />
            <button
              onClick={() => {
                handleReleased(movie._id);
              }}
              className="mt-5 flex justify-between"
            >
              {movie.isPublished ? (
                <div className={"text-sm bg-green-600 rounded-2xl px-4 py-2"}>
                  Released
                </div>
              ) : (
                <div className={"text-sm bg-red-600 rounded-2xl px-4 py-2"}>
                  Unreleased
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDashboard;

// const [movies, setMovies] = useState([]);
// const [filteredMovies, setFilteredMovies] = useState([]);
// const [searchTerm, setSearchTerm] = useState("");
// const [editingMovie, setEditingMovie] = useState(null);
// const [showFetchModal, setShowFetchModal] = useState(false);
// const [showMoviePopup, setShowMoviePopup] = useState(false);

// const [newMovie, setNewMovie] = useState({
//     title: "",
//     overview: "",
//     release_date: "",
//     runtime: "",
//     poster_path: "",
//     backdrop_path: "",
//     genres: [],
// });

// useEffect(() => {
//     const fetchMovies = async () => {
//         const response = await movieApi.getMoviesList("all", {});
//         setMovies(response.data.content);
//         setFilteredMovies(response.data.content);
//     };
//     fetchMovies();
// }, []);

// useEffect(() => {
//     setFilteredMovies(
//         movies.filter((movie) =>
//             movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );
// }, [searchTerm, movies]);

// const handlePublishAll = () => {
//     console.log("Publishing all new movies...");
//     setShowMoviePopup(false); // Close the popup after publishing
// };

// const handleSaveToDashboard = () => {
//     console.log("Saving new movies to dashboard...");
//     setShowMoviePopup(false); // Close the popup after saving
// };

// return (
//     <div>
//         <Header />
//         <div className="admin-dashboard">
//             <h1>Admin Dashboard</h1>
//             <div className="search-bar-container">
//                 <input
//                     type="text"
//                     placeholder="Search movies..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-bar"
//                 />
//             </div>
//             <div className="buttons-container">
//                 <button
//                     className="publishAll-btn"
//                     onClick={() => setShowMoviePopup(true)}
//                 >
//                     <FaRegShareSquare /> Publish All Movies
//                 </button>
//                 <button
//                     className="updateDashboard-btn"
//                     onClick={() => setShowFetchModal(true)}
//                 >
//                     <FaCloudDownloadAlt /> Update Dashboard
//                 </button>
//                 <button
//                     className="add-btn"
//                     onClick={() => setEditingMovie({})}
//                 >
//                     <FaPlus /> Add New Movie
//                 </button>
//             </div>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Overview</th>
//                         <th>Release Date</th>
//                         <th>Runtime</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredMovies.map((movie) => (
//                         <tr key={movie.id}>
//                             <td>{movie.title}</td>
//                             <td>{movie.overview}</td>
//                             <td>{movie.release_date}</td>
//                             <td>{movie.runtime} mins</td>
//                             <td className="actions">
//                                 <button
//                                     className="action-btn"
//                                     onClick={() => setEditingMovie(movie)}
//                                 >
//                                     <FaEdit />
//                                 </button>
//                                 <button
//                                     className="action-btn"
//                                     onClick={() =>
//                                         window.confirm(
//                                             "Are you sure you want to hide this movie from users?"
//                                         ) && setMovies((prev) =>
//                                             prev.filter(
//                                                 (m) => m.id !== movie.id
//                                             )
//                                         )
//                                     }
//                                 >
//                                     <span>Hide</span>
//                                 </button>
//                                 <button className="action-btn">
//                                     <FaRegShareSquare />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Popup for movies */}
//             {showMoviePopup && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>New Movies</h2>
//                         {movies.length > 0 ? (
//                             <ul className="admin-movie-list">
//                                 {movies.map((movie) => (
//                                     <li key={movie.id}>{movie.title}</li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p>No new movies available.</p>
//                         )}
//                         <div className="modal-actions">
//                             <button
//                                 className="publish-btn"
//                                 onClick={handlePublishAll}
//                             >
//                                 Publish All New Movies
//                             </button>
//                             <button
//                                 className="save-btn"
//                                 onClick={handleSaveToDashboard}
//                             >
//                                 Save into Dashboard
//                             </button>
//                             <button
//                                 className="cancel-btn"
//                                 onClick={() => setShowMoviePopup(false)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Fetch Modal */}
//             {showFetchModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Fetching Database</h2>
//                         <p>Fetching data from the database. Please wait...</p>
//                         <div className="modal-actions">
//                             <button
//                                 className="cancel-btn"
//                                 onClick={() => setShowFetchModal(false)}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     </div>
// );
