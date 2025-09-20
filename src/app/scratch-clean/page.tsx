"use client";

import { useEffect } from 'react';
import { PageLayout, Container, Section, Card } from '@/layers/ui/components/Layout';
import { Button } from '@/components/ui/button';
import { ScratchCardContainer } from '@/layers/ui/components/ScratchCardContainer';
import { ScratchStateDisplay } from '@/layers/ui/components/ScratchStateDisplay';
import { ScratchActions } from '@/layers/ui/components/ScratchActions';
import { useScratchActions } from '@/layers/logic/hooks/useScratchActions';

// Page = orchestration simple des composants
export default function ScratchCleanPage() {
  const { state, generateNewTicket, generateTestTicket, markTicketAsUsed, clearAllTickets } = useScratchActions();

  useEffect(() => {
    if (!state.available) {
      generateTestTicket();
    }
  }, [state.available, generateTestTicket]);

  return (
    <PageLayout>
      <Container>
        <Section>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#17BFA0] mb-4">
              🎫 Scratch Card - Architecture Propre
            </h1>
            <p className="text-gray-600 text-lg">
              Version refactorée avec architecture en couches
            </p>
          </div>

          <ScratchStateDisplay state={state} />
          <ScratchActions 
            onGenerateNew={() => generateNewTicket(25)}
            onMarkUsed={markTicketAsUsed}
            onClear={clearAllTickets}
          />

          {state.available && !state.used ? (
            <ScratchCardContainer
              reward={state.reward}
              onReveal={() => console.log('Ticket révélé !')}
            />
          ) : (
            <Card className="text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold mb-2">
                Pas de ticket disponible
              </h3>
              <p className="text-gray-600 mb-4">
                Terminez un quiz pour débloquer un nouveau ticket à gratter.
              </p>
              <Button onClick={() => generateNewTicket(50)}>
                Générer un ticket de test
              </Button>
            </Card>
          )}
        </Section>
      </Container>
    </PageLayout>
  );
}