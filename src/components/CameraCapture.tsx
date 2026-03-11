import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  label: string;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const startCamera = async () => {
    setIsStarting(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  const reset = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      
      {!stream && !capturedImage && (
        <button
          onClick={startCamera}
          disabled={isStarting}
          className="w-full flex items-center justify-center gap-2 py-8 border-2 border-dashed border-zinc-300 rounded-xl text-zinc-500 hover:border-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <Camera className="w-6 h-6" />
          <span>{isStarting ? 'Iniciando...' : 'Abrir Câmera'}</span>
        </button>
      )}

      {stream && (
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <button
            onClick={capture}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <div className="w-8 h-8 rounded-full border-4 border-zinc-800" />
          </button>
        </div>
      )}

      {capturedImage && (
        <div className="relative rounded-xl overflow-hidden border border-zinc-200">
          <img src={capturedImage} alt="Captured" className="w-full aspect-video object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={reset}
              className="bg-white/90 p-2 rounded-full shadow-sm hover:bg-white"
            >
              <RefreshCw className="w-4 h-4 text-zinc-600" />
            </button>
            <div className="bg-emerald-500 p-2 rounded-full shadow-sm">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
