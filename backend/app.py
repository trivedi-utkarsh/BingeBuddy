from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import requests

app = Flask(__name__)
CORS(app)

movies_dict = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

print(movies)
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

@app.route('/movies', methods=['GET'])
def get_movies():
    # Returns only titles and movie_ids for dropdowns or display
    return jsonify(movies[['movie_id', 'title']].to_dict(orient='records'))

@app.route('/recommend/<string:movie_title>', methods=['GET'])
def recommend(movie_title):
    try:
        index = movies[movies['title'] == movie_title].index[0]
    except IndexError:
        return jsonify({"error": "Movie not found"}), 404

    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended = []

    for i in distances[1:6]:  # top 5 excluding itself
        movie_info = {
            "title": movies.iloc[i[0]].title,
            "poster": fetch_poster(movies.iloc[i[0]].movie_id)
        }
        recommended.append(movie_info)

    return jsonify(recommended)

if __name__ == '__main__':
    app.run(debug=True)
