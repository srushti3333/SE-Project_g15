import os
from flask import request, jsonify, current_app, url_for
from werkzeug.utils import secure_filename
from models.user import User
from extensions import db
from flask_jwt_extended import get_jwt_identity

# Allowed file extensions for profile pictures
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_profile():
    """Fetch the logged-in user's profile."""
    user_data = get_jwt_identity()
    user_id = int(user_data) if isinstance(user_data, str) else user_data
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    profile_picture_url = None
    if user.profile_picture:
        # Build full URL for frontend
        profile_picture_url = url_for(
            'uploaded_file',
            filename=os.path.basename(user.profile_picture),
            _external=True
        )

    return jsonify({
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "street": user.street,
        "city": user.city,
        "state": user.state,
        "pincode": user.pincode,
        "profile_picture": profile_picture_url
    }), 200


def update_profile():
    """Update the logged-in user's profile and optionally upload a profile picture."""
    user_data = get_jwt_identity()
    user_id = int(user_data) if isinstance(user_data, str) else user_data
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Handle file upload
    if 'profile_picture' in request.files:
        file = request.files['profile_picture']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            os.makedirs(upload_folder, exist_ok=True)

            # Remove old profile picture if exists
            if user.profile_picture:
                old_path = os.path.join(upload_folder, os.path.basename(user.profile_picture))
                if os.path.exists(old_path):
                    os.remove(old_path)

            # Save new profile picture
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            user.profile_picture = f'uploads/profile_pictures/{filename}'

    # Update other profile fields from form data
    data = request.form
    for field in ["full_name", "phone", "street", "city", "state", "pincode"]:
        if field in data:
            setattr(user, field, data[field])

    db.session.commit()

    # Return updated profile with full URL
    profile_picture_url = None
    if user.profile_picture:
        profile_picture_url = url_for(
            'uploaded_file',
            filename=os.path.basename(user.profile_picture),
            _external=True
        )

    return jsonify({
        "message": "Profile updated successfully",
        "profile_picture": profile_picture_url
    }), 200
