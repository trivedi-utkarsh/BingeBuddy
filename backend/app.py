from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pickle
import requests

app = Flask(__name__)
CORS(app)

movies_dict = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

# print(movies)
# duplicates = movies[movies.duplicated(subset=['title'], keep=False)]
# print(duplicates)

@app.route('/fetch-poster/<int:movie_id>', methods=['GET'])
def fetch_poster(movie_id):
    try:
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US"
        response = requests.get(url, timeout=100)
        data = response.json()
        poster_path = data.get('poster_path')
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500/{poster_path}"
        else:
            return "https://via.placeholder.com/500x750?text=No+Image"
    except Exception as e:
        print(f"Error fetching poster: {e}")
        return "https://via.placeholder.com/500x750?text=Error"

@app.route('/get-title-suggestions/<string:query>', methods=['GET'])
def get_title_suggestions(query):
    if not query:
        return jsonify([])

    filtered_movies = movies[movies['title'].str.contains(query, case=False, na=False)]
    
    suggestions = filtered_movies[['title', 'movie_id', 'release_date']].head(10).to_dict(orient='records')
    
    return jsonify(suggestions)

@app.route('/get-movies/<query>', methods=['GET', 'OPTIONS'])
def get_movies_by_title(query):
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    print(f"Received query: {query}")

    query = query.lower()
    filtered = movies[movies['title'].str.lower().str.contains(query)]
    result = filtered[['movie_id', 'title', 'release_date', 'genres']].head(15).to_dict(orient='records')

    return jsonify(result)

@app.route('/get-movie/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):    

    movie = movies[movies['movie_id'] == movie_id]
    if movie.empty:
        return jsonify({"error": "Movie not found"}), 404

    movie_info = movie.iloc[0].to_dict()
    # movie_info['poster'] = fetch_poster(movie_id)
    
    return jsonify(movie_info)

@app.route('/movies', methods=['GET'])
def get_movies():
    result = movies[['movie_id', 'title', 'release_date', 'genres']].head(60).to_dict(orient='records')
    return jsonify(result)

@app.route('/recommend/<string:movie_title>', methods=['GET'])
def recommend(movie_title):
    try:
        index = movies[movies['title'] == movie_title].index[0]
    except IndexError:
        return jsonify({"error": "Movie not found"}), 404

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended = []

    for i in distances[1:6]:  # Top 5 excluding the movie itself
        movie_row = movies.iloc[i[0]]

        movie_info = {
            "movie_id": int(movie_row.movie_id),
            "title": movie_row.title,
            "release_date": str(movie_row.release_date),
            "genres": movie_row.genres,
            # "poster": fetch_poster(int(movie_row.movie_id)) if 'fetch_poster' in globals() else ""
        }

        recommended.append(movie_info)

    return jsonify(recommended)

if __name__ == '__main__':
    app.run(debug=True)
