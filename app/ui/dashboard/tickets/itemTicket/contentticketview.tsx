"use client";

import { useState } from "react";

import ButtonContent from "./toggledescriptiondataticket";
import TicketDescriptionView from "./ticketdescriptionview";
import TicketMessagesView from "./ticketmessagesview";
import { Ticket, Chat } from "@/app/lib/definitions";

export default function ContentTicketView({
  ticket,
  messagesChat,
}: {
  ticket: Ticket;
  messagesChat: Chat;
}) {
  let [descriptionActive, setDescriptionActive] = useState(true);
  let [messagesActive, setMessagesActive] = useState(false);

  function handleToggleDescription() {
    setDescriptionActive(true);
    setMessagesActive(false);
  }

  function handleToggleMessages() {
    setDescriptionActive(false);
    setMessagesActive(true);
  }

  return (
    <div className="flex flex-col mt-[20px]">
      <div className="flex flex-col md:flex-row">
        <ButtonContent
          isActive={descriptionActive}
          handleToggle={handleToggleDescription}>
          Descrição
        </ButtonContent>

        <ButtonContent
          isActive={messagesActive}
          handleToggle={handleToggleMessages}>
          Mensagens
        </ButtonContent>
      </div>
      <TicketDescriptionView
        isActive={descriptionActive}
        description={ticket.description}
        img={ticket.img}
      />
      <TicketMessagesView
        isActive={messagesActive}
        messagesChat={messagesChat}
      />
    </div>
  );
}
