package com.example.verduleria.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true, nullable=false)
    private String userName;

    @Column(nullable=false)
    private String firstName;

    @Column(nullable=false)
    private String lastName;

    @Column(nullable=false)
    private String email;

    @Column(nullable=true)
    private Date date;
    
    @Column(nullable=false)
    private String password;

    // @ManyToOne(cascade = CascadeType.REMOVE) // Idk if remove is correct
    // @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false, updatable = true)
    // @JsonBackReference("role-usuario")
    // private Role role;

    public Usuario(String userName, String firstName, String lastName, String email, Date date, String password) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.date = date;
        this.password = password;
    }

}
