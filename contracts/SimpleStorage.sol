// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 favNo;
    address public immutable owner;

    struct Person {
        uint256 favNo;
        string userName;
    }

    Person[] public people;
    mapping(string => uint256) nameToFavNo;

    constructor() {
        owner = msg.sender;
    }

    function createPerson(uint256 _favNo, string memory _userName) public {
        Person memory newPerson = Person(_favNo, _userName);
        people.push(newPerson);
        nameToFavNo[_userName] = _favNo;
    }

    function store(uint256 _favNo) public {
        favNo = _favNo;
    }

    function retrieve() public view returns (uint256) {
        return favNo;
    }

    function retrievePerson(
        string memory _userName
    ) public view returns (uint256, string memory) {
        for (uint256 i = 0; i < people.length; i++) {
            if (
                keccak256(bytes(people[i].userName)) ==
                keccak256(bytes(_userName))
            ) {
                return (people[i].favNo, people[i].userName);
            }
        }
        revert("User not found!");
    }
}
