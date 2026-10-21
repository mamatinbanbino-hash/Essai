/**
 * Nexus Analytics - Module d'envoi et de synchronisation (send.js)
 */

const NexusSender = {
  endpoint: '/api/v1/telemetry',

  async sendPayload(data) {
    try {
      console.log('[NexusSender] Préparation de l\'envoi...', data);
      
      // Simulation d'une requête réseau asynchrone
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = {
        success: true,
        timestamp: new Date().toISOString(),
        status: 200,
        message: 'Données transmises avec succès'
      };

      console.log('[NexusSender] Réponse reçue :', response);
      return response;
    } catch (error) {
      console.error('[NexusSender] Erreur lors de l\'envoi :', error);
      return {
        success: false,
        error: error.message || 'Erreur inconnue'
      };
    }
  },

  broadcastMetrics(metrics) {
    this.sendPayload(metrics).then(res => {
      if (res.success) {
        this.notifyUser('Synchronisation réussie', 'success');
      } else {
        this.notifyUser('Échec de la synchronisation', 'error');
      }
    });
  },

  notifyUser(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400';
    
    notification.className = `fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl border text-xs font-medium backdrop-blur shadow-2xl transition-all duration-300 ${bgColor}`;
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

// Exposition globale
window.NexusSender = NexusSender;

document.addEventListener('DOMContentLoaded', () => {
  console.log('NexusSender initialisé.');
});
