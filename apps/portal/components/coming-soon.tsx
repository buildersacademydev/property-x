"use client"
import React from 'react'

const ComingSoon = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            color: 'white',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                padding: '40px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                {/* Logo/Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(45deg, #ffd700, #ffed4a)',
                    borderRadius: '50%',
                    margin: '0 auto 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                }}>
                    🏠
                </div>

                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '20px',
                    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    Coming Tomorrow (15 Oct, 2025)
                </h1>

                {/* Subtitle */}
                <p style={{
                    fontSize: '1.25rem',
                    marginBottom: '30px',
                    opacity: '0.9',
                    lineHeight: '1.6'
                }}>
                    We're working hard to bring you something amazing. Stay tuned for the launch of our revolutionary property platform!
                </p>

                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    marginBottom: '30px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: '85%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #ffd700, #ffed4a)',
                        borderRadius: '4px',
                        animation: 'pulse 2s ease-in-out infinite alternate'
                    }}></div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    100% { opacity: 0.7; }
                }
                
                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem !important; }
                    p { font-size: 1rem !important; }
                    .container { padding: 20px !important; }
                }
            `}</style>
        </div>
    )
}

export default ComingSoon