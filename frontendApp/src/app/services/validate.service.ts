import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateLogin(user) {
    if (user.username === undefined || user.password === undefined) {
      return { isValid: false, msg: 'Uzupełnij wszystkie pola' };
    }
    return { isValid: true, msg: '' };
  }

  validateRegister(user, passwordRepeat) {
    if (
      user.username === undefined ||
      user.email === undefined ||
      user.password === undefined
    ) {
      return { isValid: false, msg: 'Uzupełnij wszystkie pola' };
    }
    const emialValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emialValidator.test(String(user.email).toLowerCase())) {
      return { isValid: false, msg: 'Podaj poprawny adres email' };
    }
    if (user.password.length < 5) {
      return {
        isValid: false,
        msg: 'Hasło musi posiadać co najmniej 5 znaków',
      };
    }
    if (user.password !== passwordRepeat) {
      return { isValid: false, msg: 'Hasła muszą się zgadzać' };
    }
    return { isValid: true, msg: '' };
  }

  validateUserUpdate(user, passwordNewRepeat) {
    const emialValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emialValidator.test(String(user.email).toLowerCase())) {
      return { isValid: false, msg: 'Podaj poprawny adres email' };
    }
    if (
      (user.passwordOld === null && user.passwordNew !== null) ||
      (user.passwordOld !== null && user.passwordNew === null)
    ) {
      return {
        isValid: false,
        msg: 'Podaj stare i nowe hasło aby zmienić hasło',
      };
    }
    if (user.passwordNew !== null) {
      if (user.passwordNew.length < 5) {
        return {
          isValid: false,
          msg: 'Nowe hasło musi posiadać co najmniej 5 znaków',
        };
      }
      if (user.passwordNew !== passwordNewRepeat) {
        return { isValid: false, msg: 'Nowe hasła muszą się zgadzać' };
      }
    }
    return { isValid: true, msg: '' };
  }

  validateRoom(newRoom) {
    const { name, maxPeople } = newRoom;
    if (name === undefined || name.trim().length === 0 || maxPeople === '')
      return { isValid: false, msg: 'Podaj nazwę i max liczbę osób' };
    else return { isValid: true, msg: '' };
  }

  validateFriendName(friendName, actualFriends) {
    if (friendName === null || friendName.trim() === '') {
      actualFriends.forEach(friend => {
        if (friend.name === friendName) {
          return {
            isValid: false,
            msg: 'Masz już tego użytkownika w znajomych',
          };
        }
      });
      return { isValid: false, msg: 'Podaj nazwę użytkownika' };
    }
    return { isValid: true, msg: '' };
  }

  validateRoomPassword(roomPassword, currentRoom) {
    if (currentRoom.password != null) {
      if (roomPassword === null || roomPassword.trim() === '') {
        if (currentRoom.password !== roomPassword) {
          return { isValid: false, msg: 'Niepoprawne hasło' };
        }
        return { isValid: false, msg: 'Podaj hasło' };
      }
    }
    return { isValid: true, msg: '' };
  }

  validateNewWord(newWord, categoryId, words) {
    if (
      categoryId === 0 ||
      newWord === undefined ||
      newWord.trim().length < 3
    ) {
      return {
        isValid: false,
        msg: 'Podaj poprawną nazwę i wybierz kategorię',
      };
    } else {
      if (
        words.find(word => word.word.toUpperCase() === newWord.toUpperCase())
      ) {
        return {
          isValid: false,
          msg: 'Takie słowo już istnieje',
        };
      } else {
        return { isValid: true, msg: '' };
      }
    }
  }

  validateNewCategory(newCategory, categories) {
    if (newCategory === undefined || newCategory.trim().length < 3) {
      return { isValid: false, msg: 'Podaj poprawną nazwę' };
    } else {
      if (
        categories.find(
          category =>
            category.categoryName.toUpperCase() === newCategory.toUpperCase()
        )
      ) {
        return {
          isValid: false,
          msg: 'Taka kategoria już istnieje',
        };
      } else {
        return { isValid: true, msg: '' };
      }
    }
  }
}
