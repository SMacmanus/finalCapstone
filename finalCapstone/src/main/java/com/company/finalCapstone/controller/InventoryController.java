package com.company.finalCapstone.controller;

import com.company.finalCapstone.dto.Inventory;
import com.company.finalCapstone.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController

public class InventoryController {
    @Autowired
    InventoryService inventoryService;

    @RequestMapping(value="/inventory", method = RequestMethod.GET)
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @RequestMapping(value="/inventory/{id}", method = RequestMethod.GET)
    public Inventory getInventoryById(@PathVariable int id){
        return inventoryService.getInventoryById(id);
    }

    @RequestMapping(value="/inventory", method = RequestMethod.POST)
    public Inventory addItem(@RequestBody @Valid Inventory newItem) {
        return inventoryService.addItem(newItem);
    }

    @RequestMapping(value="/inventory/{id}", method = RequestMethod.PUT)
    public Inventory updateInventoryItem(@RequestBody @Valid Inventory changedItem, @PathVariable int id){
        return inventoryService.updateInventoryItem(changedItem, id);
    }

    @RequestMapping(value="/inventory/{id}", method = RequestMethod.DELETE)
    public void deleteById(@PathVariable int id){
        inventoryService.deleteInventoryItemById(id);
    }

    @RequestMapping(value="/purchase", method = RequestMethod.POST)
    public void purchase(@RequestBody @Valid Inventory[] items) {
        inventoryService.purchase(items);
    }

    @RequestMapping(value="/tax/{id}", method = RequestMethod.GET)
    public float getItemTaxById(@PathVariable int id) {
        return inventoryService.getTotalTax(id);
    }
}
