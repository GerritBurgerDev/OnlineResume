package Interfaces

import "Backend/Structs"

type Document interface {
	Structs.Recommendation | Structs.User
}
