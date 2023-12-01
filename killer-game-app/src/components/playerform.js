import React, { useState, useEffect } from 'react'
import Profiles from './profiles';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../utils/firebase';

function PlayerForm() {
    const [player, setPlayer] = useState({
        name: '',
        class: '',
        score: 0,
        status: '',
        imageUrl: ''
    });
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (image) {
            const imageRef = ref(storage, `players/${image.name}`);
            try {
                const snapshot = await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(snapshot.ref);
                const docRef = await addDoc(collection(firestore, 'players'), { ...player, imageUrl });
                resetForm();
            } catch (error) {
                console.error('Error uploading image and writing document: ', error);
            }
        } else {
            try {
                const docRef = await addDoc(collection(firestore, 'players'), player);
                console.log('Document successfully written with ID: ', docRef.id);
                resetForm();
            } catch (error) {
                console.error('Error writing document: ', error);
            }
        }
    };

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setPlayer({ name: '', class: '', score: 0, status: '', imageUrl: '' });
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={player.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="class"
                value={player.class}
                onChange={handleChange}
                placeholder="Class"
            />
            <input
                type="number"
                name="score"
                value={player.score}
                onChange={handleChange}
                placeholder="Score"
            />
            <input
                type="text"
                name="status"
                value={player.status}
                onChange={handleChange}
                placeholder="Status"
            />
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            <button type="submit">Add Player</button>
        </form>
    );
}

export default PlayerForm;
