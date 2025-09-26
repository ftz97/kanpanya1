"use client";
import { useState } from "react";

export default function TestBasicPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `${timestamp}: ${message}`]);
  };

  const openModal = () => {
    setIsModalOpen(true);
    addLog("Modal ouvert");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
    addLog("Modal fermé");
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      addLog(`Étape ${step + 1} atteinte`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🎥 Test Modal Basique
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={openModal}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Ouvrir Modal
        </button>
        
        <button 
          onClick={clearLogs}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Effacer Logs
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>Logs ({logs.length} entrées):</h3>
        {logs.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Aucun log pour le moment
          </p>
        ) : (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {logs.map((log, index) => (
              <div key={index} style={{ 
                padding: '5px', 
                backgroundColor: 'white', 
                margin: '2px 0',
                borderRadius: '3px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative'
          }}>
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {/* Contenu selon l'étape */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '20px', color: '#333' }}>
                Étape {step} sur 3
              </h2>

              {step === 1 && (
                <div>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎥</div>
                  <h3 style={{ marginBottom: '15px' }}>Étape Vidéo</h3>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Présentation du partenaire
                  </p>
                  <button
                    onClick={nextStep}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Continuer ➡️
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>❓</div>
                  <h3 style={{ marginBottom: '15px' }}>Étape Quiz</h3>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Test de connaissances
                  </p>
                  <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '15px', 
                    borderRadius: '5px',
                    marginBottom: '20px'
                  }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                      Question : Quel est le rôle d'une mutuelle ?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <button style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}>
                        Protéger la santé
                      </button>
                      <button style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}>
                        Vendre des chaussures
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Continuer ➡️
                  </button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎟️</div>
                  <h3 style={{ marginBottom: '15px' }}>Étape Scratch Card</h3>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Grattez votre ticket !
                  </p>
                  <div style={{ 
                    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                    padding: '30px',
                    borderRadius: '10px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎁</div>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                      +50 points Kanpanya
                    </p>
                    <p style={{ fontSize: '14px', margin: '5px 0 0 0', color: '#666' }}>
                      Récompense révélée !
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6f42c1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Terminer ✅
                  </button>
                </div>
              )}

              {/* Barre de progression */}
              <div style={{ 
                marginTop: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                height: '8px'
              }}>
                <div style={{
                  backgroundColor: '#007bff',
                  height: '8px',
                  borderRadius: '10px',
                  width: `${(step / 3) * 100}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}