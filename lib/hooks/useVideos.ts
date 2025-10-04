'use client';
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { firestore, storage } from '@/config/firebase';

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  youtubeUrl?: string;
  useYoutube: boolean;
  createdAt: Date;
  updatedAt: Date;
  uploadedBy: string;
}

export interface VideoUploadData {
  title: string;
  description: string;
  videoFile?: File;
  thumbnailFile?: File;
  youtubeUrl?: string;
  useYoutube: boolean;
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar todos os vídeos
  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const videosRef = collection(firestore, 'videos');
      const q = query(videosRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const videosData: Video[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        videosData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
          thumbnailUrl: data.thumbnailUrl,
          youtubeUrl: data.youtubeUrl,
          useYoutube: data.useYoutube || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          uploadedBy: data.uploadedBy,
        });
      });
      
      setVideos(videosData);
    } catch (err) {
      console.error('Erro ao carregar vídeos:', err);
      setError('Erro ao carregar vídeos');
    } finally {
      setLoading(false);
    }
  };

  // Upload de novo vídeo
  const uploadVideo = async (videoData: VideoUploadData, uploadedBy: string) => {
    try {
      setLoading(true);
      setError(null);

      let videoUrl = '';
      
      // Upload do vídeo apenas se não estiver usando YouTube
      if (!videoData.useYoutube && videoData.videoFile && videoData.videoFile.size > 0) {
        const videoRef = ref(storage, `videos/${Date.now()}_${videoData.videoFile.name}`);
        const videoSnapshot = await uploadBytes(videoRef, videoData.videoFile);
        videoUrl = await getDownloadURL(videoSnapshot.ref);
      }

      let thumbnailUrl = '';
      
      // Upload da thumbnail se fornecida
      if (videoData.thumbnailFile) {
        const thumbnailRef = ref(storage, `thumbnails/${Date.now()}_${videoData.thumbnailFile.name}`);
        const thumbnailSnapshot = await uploadBytes(thumbnailRef, videoData.thumbnailFile);
        thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
      }

      // Salvar dados no Firestore
      const docRef = await addDoc(collection(firestore, 'videos'), {
        title: videoData.title,
        description: videoData.description,
        videoUrl: videoUrl || '', // URL vazia se usando YouTube
        thumbnailUrl,
        youtubeUrl: videoData.youtubeUrl || '',
        useYoutube: videoData.useYoutube || false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        uploadedBy,
      });

      // Recarregar lista de vídeos
      await loadVideos();

      return docRef.id;
    } catch (err) {
      console.error('Erro ao fazer upload do vídeo:', err);
      setError('Erro ao fazer upload do vídeo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar vídeo
  const updateVideo = async (id: string, updates: Partial<VideoUploadData>, uploadedBy: string) => {
    try {
      setLoading(true);
      setError(null);

      const videoRef = doc(firestore, 'videos', id);
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.now(),
        uploadedBy,
      };

      // Se há um novo arquivo de vídeo
      if (updates.videoFile) {
        // Deletar vídeo antigo (opcional - pode manter para histórico)
        const newVideoRef = ref(storage, `videos/${Date.now()}_${updates.videoFile.name}`);
        const videoSnapshot = await uploadBytes(newVideoRef, updates.videoFile);
        const videoUrl = await getDownloadURL(videoSnapshot.ref);
        updateData.videoUrl = videoUrl;
      }

      // Se há uma nova thumbnail
      if (updates.thumbnailFile) {
        const thumbnailRef = ref(storage, `thumbnails/${Date.now()}_${updates.thumbnailFile.name}`);
        const thumbnailSnapshot = await uploadBytes(thumbnailRef, updates.thumbnailFile);
        const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);
        updateData.thumbnailUrl = thumbnailUrl;
      }

      await updateDoc(videoRef, updateData);
      await loadVideos();
    } catch (err) {
      console.error('Erro ao atualizar vídeo:', err);
      setError('Erro ao atualizar vídeo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar vídeo
  const deleteVideo = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const video = videos.find(v => v.id === id);
      if (!video) throw new Error('Vídeo não encontrado');

      // Deletar arquivos do storage
      try {
        const videoRef = ref(storage, video.videoUrl);
        await deleteObject(videoRef);
      } catch (storageErr) {
        console.warn('Erro ao deletar vídeo do storage:', storageErr);
      }

      if (video.thumbnailUrl) {
        try {
          const thumbnailRef = ref(storage, video.thumbnailUrl);
          await deleteObject(thumbnailRef);
        } catch (storageErr) {
          console.warn('Erro ao deletar thumbnail do storage:', storageErr);
        }
      }

      // Deletar documento do Firestore
      await deleteDoc(doc(firestore, 'videos', id));
      await loadVideos();
    } catch (err) {
      console.error('Erro ao deletar vídeo:', err);
      setError('Erro ao deletar vídeo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    uploadVideo,
    updateVideo,
    deleteVideo,
    loadVideos,
  };
}
