import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookingConfirmation = ({ bookingDetails, event, onBookAnother }) => {
  const receiptRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    const element = receiptRef.current;
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Ticket_${event.name.replace(/\s+/g, '_')}_${bookingDetails.name}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="card confirmation-card animate-slide-up">
      <div ref={receiptRef} style={{ padding: '20px', backgroundColor: 'var(--bg-card, #1f2937)', borderRadius: '12px', color: 'var(--text-primary, #f9fafb)' }}>
        <div className="success-icon" style={{ margin: '0 auto 1.5rem', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        
        <h2 className="confirmation-title" style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'inherit' }}>Booking Successful!</h2>
        <p className="confirmation-subtitle" style={{ textAlign: 'center', color: 'var(--text-secondary, #9ca3af)', marginBottom: '2rem' }}>
          Thank you, {bookingDetails.name}. Your tickets have been reserved.
        </p>

        <div className="receipt" style={{ backgroundColor: 'var(--bg-main, #111827)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color, #374151)' }}>
          <div className="receipt-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="receipt-label" style={{ color: 'var(--text-secondary, #9ca3af)' }}>Event</span>
            <span className="receipt-value" style={{ fontWeight: '500', color: 'inherit', textAlign: 'right' }}>{event.name}</span>
          </div>
          <div className="receipt-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="receipt-label" style={{ color: 'var(--text-secondary, #9ca3af)' }}>Tickets Booked</span>
            <span className="receipt-value" style={{ fontWeight: '500', color: 'inherit', textAlign: 'right' }}>{bookingDetails.tickets}</span>
          </div>
          <div className="receipt-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="receipt-label" style={{ color: 'var(--text-secondary, #9ca3af)' }}>Email ID</span>
            <span className="receipt-value" style={{ fontWeight: '500', color: 'inherit', textAlign: 'right' }}>{bookingDetails.email}</span>
          </div>
          <div className="receipt-item" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color, #374151)' }}>
            <span className="receipt-label" style={{ fontWeight: 'bold', color: 'inherit' }}>Total Amount</span>
            <span className="receipt-value" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-color, #3b82f6)', textAlign: 'right' }}>₹{(bookingDetails.tickets * event.price).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={downloadPDF} 
          disabled={isDownloading}
          style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF
            </>
          )}
        </button>
        <button className="btn btn-primary" onClick={onBookAnother} style={{ flex: 1 }}>
          Book More
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
