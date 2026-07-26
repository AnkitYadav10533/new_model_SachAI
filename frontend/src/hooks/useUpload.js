import { useState } from 'react';
import { analyzeMedia } from '../services/api.js';
import { validateSelectedFile } from '../utils/fileValidation.js';

export function useUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [activeTab, setActiveTab] = useState('image'); // 'image' | 'video' | 'audio' | 'text'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileSelect = (file) => {
    setError(null);
    if (!file) return;

    const validation = validateSelectedFile(file, activeTab);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setSelectedFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setTextContent('');
    setError(null);
  };

  const triggerAnalysis = async () => {
    setError(null);

    if (activeTab === 'text') {
      if (!textContent || textContent.trim().length < 15) {
        setError('Please enter at least 15 characters of text to analyze.');
        return;
      }
    } else if (!selectedFile) {
      setError(`Please select a ${activeTab} file to analyze.`);
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeMedia(selectedFile, activeTab, textContent);
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Analysis request failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setTextContent('');
    setError(null);
    setResult(null);
  };

  return {
    selectedFile,
    previewUrl,
    textContent,
    setTextContent,
    activeTab,
    loading,
    error,
    result,
    handleFileSelect,
    handleTabChange,
    triggerAnalysis,
    resetUpload
  };
}
