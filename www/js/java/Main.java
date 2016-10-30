/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vtayur.xml2jsonformatter;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

/**
 *
 * @author vtayur
 */
public class Main {

    public static void main(String[] args) {
        try {
            Serializer serializer = new Persister();
            File source = new File("purusha-san.xml");

            PurushaSukta example = serializer.read(PurushaSukta.class, source);

            for (Section sec : example.getSections()) {
                for (Shloka shloka : sec.getShlokaList()) {
                    shloka.setText(shloka.getText().replaceAll("\n", "\\\n"));
                    ShlokaDescription desc = shloka.getExplanation();
                    if (desc != null) {
                        List<Note> lstNotes = desc.getNotesList();

                        for (Note note : lstNotes) {
                            note.setText(note.getText().replaceAll("\n", "\\\n"));
                        }
                    }
                }
            }

            File result = new File("purusha-san.mod.xml");
            serializer.write(example, result);

            Gson gson = new Gson();
            String json = gson.toJson(example);
            FileWriter resultJson = new FileWriter(new File("purusha_san.json"));
            resultJson.append(json);
            resultJson.close();

        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
