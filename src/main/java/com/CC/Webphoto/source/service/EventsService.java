package com.CC.Webphoto.source.service;

import com.CC.Webphoto.source.model.Events;

import java.util.List;

public interface EventsService {


    Events saveEvents(Events events);

    Long numberOfEvents();

    List<Events> findAllEvents();
}
