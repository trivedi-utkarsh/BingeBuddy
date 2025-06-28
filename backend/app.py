from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import requests

app = Flask(__name__)
CORS(app) 

# Load data and model
# movies_df = pd.read_csv('movies.csv')
movies_dict = pickle.load(open('movies_recommendation.pkl','rb'))
movies = pd.DataFrame(movies_dict)

print(movies.head())  
# Replace with your actual model loading
# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

# @app.route('/movies', methods=['GET'])
# def get_movies():
#     return jsonify(movies_df.to_dict(orient='records'))

# @app.route('/recommend/<int:movie_id>', methods=['GET'])
# def recommend(movie_id):
#     # Replace this with your model's logic
#     similar_movie_ids = model.get_similar_movies(movie_id)  # You define this
#     recommended = movies_df[movies_df['id'].isin(similar_movie_ids)]
#     return jsonify(recommended.to_dict(orient='records'))

def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/discover/movie/{}?api_key=3a3df0278574dafae4254d863d38f4a4&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    print(full_path)
    return full_path

print("Fetching poster for movie ID 285")
fetch_poster(285)

if __name__ == '__main__':
    app.run(debug=True)

